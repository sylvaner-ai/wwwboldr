# BoldR — design system

Adaptation du système « editorial zinc grid » fourni par le client. Les valeurs de référence sont dans `src/styles/global.css`.

**Thème :** clair. Toile zinc, cartes blanches à filet fin, blocs sombres en contrepoint.

## Couleurs
| Nom | Valeur | Rôle |
|---|---|---|
| Obsidian | `#09090b` | Boutons principaux, titres |
| Graphite | `#18181b` | Texte courant, blocs sombres |
| Slate | `#27272a` | Cartes dans les blocs sombres |
| Iron | `#3f3f46` | Badges pleins, libellés secondaires |
| Steel | `#52525b` | Texte secondaire |
| Fog | `#71717a` | Mot rotatif du héros, métadonnées |
| Ash | `#a1a1aa` | Texte secondaire sur fond sombre |
| Mist | `#d4d4d8` | Séparateurs |
| Cloud | `#ececee` | Filets des cartes |
| Paper | `#f4f4f5` | Fond de page, fond des visuels |
| Snow | `#ffffff` | Cartes |
| Ember | `#ff5a00` | Signal rare uniquement |

**Ember** est réservé au point du logo, à l'onglet actif du héros, à la sélection du formulaire, à la « Cible » de la cartographie et à l'état « Bloqué » du harnais. Son texte est en Obsidian pour le contraste. Le magenta du système d'origine est retiré.

## Typographie
Une seule famille : **DM Sans** variable, auto-hébergée. Titres en graisse 600 (64 px maximum, interligne 1,12), corps 15 px, introductions 18 px.

## Formes
Cartes 36 px, blocs pleine largeur 48 px, visuels 26 px, boutons et champs 14 px, badges 12 px, bouton de navigation en pilule. Pas d'ombre sur les cartes : uniquement des filets de 1 px. Seul le bouton principal porte l'ombre interne du système.

## Mise en page
Conteneur de 1200 px, grille de 12 colonnes implicite. Toutes les pages alternent cartes blanches et bloc sombre.

## Visuels de livrables
La richesse visuelle vient d'interfaces fictives codées (`src/components/viz/`) : scorecard, cartographie, pilotage, infrastructure, RAG, harnais. Chacune porte la mention « Exemple illustratif, données fictives » ou est présentée comme telle. Aucune ne doit citer de vrai client ni de vrai chiffre.

## Photographie
Une seule photo, de banque d'images (Unsplash) : une roche en strates, désaturée pour rester dans la gamme zinc. Elle sert de respiration sur l'accueil et À propos, à grands arrondis.

## Mouvement
Un seul geste signature : dans le héros, l'onglet, le mot rotatif et le visuel changent ensemble toutes les 6 secondes, avec un bouton de pause. Les visuels s'animent une fois à leur entrée dans l'écran. Tout est complet sans JavaScript et sans animation si le visiteur limite les mouvements.

## À ne pas faire
- Ajouter une couleur d'accent ou utiliser Ember pour du texte ou de grands aplats.
- Ajouter un surtitre au-dessus des titres.
- Écrire `style="…"` ou un script en ligne : la CSP les bloque en production.
