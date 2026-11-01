<?php
/**
 * BoldR — réception du formulaire de contact.
 *
 * Envoie le message par e-mail via SMTP (Hostinger), sans le stocker sur le
 * serveur. Configuration par variables d'environnement (à définir dans Coolify) :
 *   SMTP_HOST  (défaut : smtp.hostinger.com)
 *   SMTP_PORT  (défaut : 465, SSL)
 *   SMTP_USER  adresse de la boîte d'envoi, ex. contact@boldr.fr
 *   SMTP_PASS  mot de passe de cette boîte
 *   MAIL_TO    destinataire des messages (défaut : SMTP_USER)
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

require __DIR__ . '/../vendor/autoload.php';

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, string $error = '', int $code = 200): never
{
    global $wantsJson;
    http_response_code($ok ? 200 : $code);

    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($ok) {
        header('Location: /merci/', true, 303);
        exit;
    }

    header('Content-Type: text/html; charset=utf-8');
    $msg = htmlspecialchars($error, ENT_QUOTES, 'UTF-8');
    echo "<!doctype html><html lang=\"fr\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
        . "<title>Erreur — BoldR</title>"
        . "<h1>Votre message n'a pas pu être envoyé</h1>"
        . "<p>{$msg}.</p><p><a href=\"/contact/\">Revenir au formulaire</a> ou écrivez-nous à "
        . "<a href=\"mailto:contact@boldr.fr\">contact@boldr.fr</a>.</p></html>";
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'Méthode non autorisée', 405);
}

// --- Anti-spam ---------------------------------------------------------

// Champ piège : rempli uniquement par les robots. On simule un succès.
if (trim((string)($_POST['website'] ?? '')) !== '') {
    respond(true);
}

// Formulaire envoyé trop vite (moins de 3 s après affichage) : robot probable.
$shownAt = (int)($_POST['t'] ?? 0);
if ($shownAt > 0 && time() - $shownAt < 3) {
    respond(true);
}

// Limite : 5 messages par heure et par adresse IP.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/boldr-rate-' . hash('sha256', $ip);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($rateFile))),
        fn (int $ts) => $ts > $now - 3600
    );
}
if (count($hits) >= 5) {
    respond(false, 'Trop de messages envoyés depuis votre connexion, merci de réessayer plus tard', 429);
}

// --- Validation --------------------------------------------------------

function field(string $name, int $max = 120): string
{
    $value = trim((string)($_POST[$name] ?? ''));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max);
}

$profiles = [
    'investisseur' => 'Investisseur',
    'numerique'    => 'Entreprise du numérique',
    'adoption'     => "Entreprise qui adopte l'IA",
    'autre'        => 'Autre',
];

$prenom  = field('prenom');
$nom     = field('nom');
$email   = field('email', 160);
$societe = field('societe');
$profil  = $profiles[field('profil', 20)] ?? '';
$message = field('message', 5000);

foreach (['prénom' => $prenom, 'nom' => $nom, 'e-mail' => $email, 'profil' => $profil, 'message' => $message] as $label => $value) {
    if ($value === '') {
        respond(false, "Le champ « {$label} » est obligatoire", 422);
    }
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, "L'adresse e-mail n'est pas valide", 422);
}

// --- Envoi -------------------------------------------------------------

$smtpUser = getenv('SMTP_USER') ?: '';
$smtpPass = getenv('SMTP_PASS') ?: '';
if ($smtpUser === '' || $smtpPass === '') {
    error_log('[contact] SMTP_USER ou SMTP_PASS non configuré');
    respond(false, "Le service d'envoi est momentanément indisponible", 500);
}

$body = "Nouveau message reçu sur boldr.fr\n\n"
    . 'Profil :  ' . $profil . "\n"
    . 'Nom :     ' . $prenom . ' ' . $nom . "\n"
    . 'E-mail :  ' . $email . "\n"
    . 'Société : ' . ($societe !== '' ? $societe : '—') . "\n"
    . "\nMessage :\n" . $message
    . "\n\n--\nEnvoyé le " . date('d/m/Y à H:i') . "\n";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';
    $mail->Port       = (int)(getenv('SMTP_PORT') ?: 465);
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = $mail->Port === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;
    $mail->Timeout    = 15;

    $mail->setFrom($smtpUser, 'Site BoldR');
    $mail->addAddress(getenv('MAIL_TO') ?: $smtpUser);
    $mail->addReplyTo($email, $prenom . ' ' . $nom);

    $mail->Subject = 'Contact — ' . $profil . ' — ' . $prenom . ' ' . $nom;
    $mail->Body    = $body;

    $mail->send();
} catch (MailException $e) {
    error_log('[contact] Échec SMTP : ' . $mail->ErrorInfo);
    respond(false, "L'envoi a échoué", 502);
}

$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

respond(true);
