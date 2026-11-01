# BoldR — site vitrine

Site multipage de BoldR (conseil stratégique et expertise en cybersécurité et IA).

- `src/` : le site Astro (pages, composants, styles)
- `src/content/fr/` : les textes modifiables en Markdown (services, réalisations, articles)
- `public/envoi.php` : envoie les messages du formulaire par e-mail
- `Dockerfile` : build Astro, puis image PHP 8.3 + Apache avec PHPMailer
- `DESIGN.md` et `PRODUCT.md` : design system et contexte

## Aperçu en local

```bash
npm install && npm run dev
```

Ouvrir http://localhost:4321. Le formulaire ne fonctionne pas dans cet aperçu, car il lui faut PHP. Pour le tester en local avec Docker :

```bash
docker build -t boldr . && docker run --rm -p 8080:80 -e SMTP_USER=contact@boldr.fr -e SMTP_PASS=... boldr
```

## Déploiement avec Coolify (VPS Hostinger)

1. Dans Coolify : **New Resource → Private Repository (GitHub App)**, choisir `sylvaner-ai/wwwboldr` et la branche `main`.
2. **Build Pack** : `Dockerfile`. **Port exposé** : `80`.
3. **Domaines** : `https://boldr.fr,https://www.boldr.fr`. Coolify génère le certificat HTTPS.
4. **Variables d'environnement** :

   | Variable    | Valeur                                    |
   |-------------|-------------------------------------------|
   | `SMTP_HOST` | `smtp.hostinger.com`                      |
   | `SMTP_PORT` | `465`                                     |
   | `SMTP_USER` | `contact@boldr.fr`                        |
   | `SMTP_PASS` | mot de passe de la boîte (à saisir par vous) |
   | `MAIL_TO`   | `contact@boldr.fr`                        |

5. **DNS** (une fois le transfert du domaine terminé) : enregistrements `A` pour `@` et `www` vers l'IP du VPS. Ne touchez pas aux enregistrements `MX`, `SPF` et `DKIM`, dont dépend la messagerie.
6. **Deploy**, puis activez *Auto Deploy* : chaque `git push` sur `main` redéploie le site.

## Après la mise en ligne

- Envoyer un message de test depuis le formulaire et vérifier sa réception sur contact@boldr.fr.
- En cas d'échec, regarder les logs du conteneur dans Coolify (lignes `[contact]`).
- Vérifier l'adresse de l'hébergeur dans `src/pages/mentions-legales.astro` par rapport à votre espace client.

## Modifier le contenu

- Services, réalisations, articles : `src/content/fr/`
- Pages : `src/pages/`
- Visuels fictifs : `src/components/viz/`
- Styles : `src/styles/global.css`

Ouvrir l'anglais : ajouter `en` aux `locales` dans `astro.config.mjs`, puis créer `src/content/en/` et `src/pages/en/`.
