# Cahier des Charges
## Projet de Refonte de l'Application Web USPV Judo Pont-de-Roide

> **Version condensée — non officielle.** Ce document est un aperçu synthétique
> destiné à la lecture en ligne. La **version officielle**, mise en forme et
> imprimée, est le PDF [`CDC-officiel.pdf`](CDC-officiel.pdf) (seul document de
> référence). Voir aussi le [`DAT-officiel.pdf`](DAT-officiel.pdf).

**Client / Association** : Union Sportive de Pont-de-Roide Vermondans (USPV Judo)  
**Projet** : Refonte de l'application web et création d'un outil de gestion (CRM associatif)  
**Développeur / Stagiaire** : Mehdi LAFAY  
**Tuteur de stage** : David LECOCQ  
**Responsable validation** : Frédéric MAIROT (Président) et David LECOCQ  
**Status** : Étudiant en 2ème année d'informatique  
**Date** : 9 avril 2026

---

## Résumé Exécutif

### Note importantes : Évolution par rapport aux prévisions

Ce document a été rédigé le 9 avril 2026 et évolutif pendant le stage. Les plannings et réalité d'implémentation ont connu des ajustements :

**Changements clés (vs. prévisions initiales)** :
- **Interface de communication serveur (API REST)** : Initialement prévue avec Express classique → **Implémentée avec le moteur ultra-rapide Nitro** (runtime optimisé pour Nuxt).
- **Structure d'affichage (Architecture)** : Rendu hybride entre serveur et navigateur (SSR/CSR hybride) livré dès le début pour un affichage plus rapide et un meilleur référencement (améliore SEO + perf).
- **Système de connexion (Authentification)** : Sécurité par jetons invisibles (JWT en cookie httpOnly) plutôt qu'un stockage local vulnérable (localStorage initial).
- **Tableau de bord d'avancement (Kanban/Gestion tâches)** : Suivi intégré via l'outil en ligne **Trello** (visibilité des tâches en temps réel).
- **Mises à jour automatisées (DevOps CI/CD)** : Outil **GitHub Actions** mis en place pour publier et tester le site automatiquement.
- **Modules optionnels** : Espace Famille reporté (priorité inversée avec sécurité admin)

**Périmètre réalisé (Produit minimum viable / MVP Garanti)** :
- Vitrine publique avec affichage rapide (SSR optimisée).
- Formulaire d'inscription pas à pas interactif (tunnel multi-étapes réactif).
- Espace de gestion sécurisé pour le club (intranet admin).
- Connexion sécurisée avec mots de passe brouillés (Authentification JWT + hachage bcrypt).
- Système de stockage fiable (Base de données PostgreSQL : 24 tableaux, fiabilité totale / 100% atomicité).
- Mise en ligne sur un serveur dédié et mises à jour automatisées (Déploiement VPS + CI/CD).

**Modules priorisés en post-MVP (Souhaité/Éventuel)** :
- Espace Famille (accès parent → grades/documents)
- Boutique (catalogue + CRUD)
- Direct du Dojo (flux vidéo live)
- Tournois (saisie clubs invités)

**Ressources actualisées** :
- [Planning réel (Google Sheets)](https://docs.google.com/spreadsheets/d/1ox_GHF1bHFgtLE5o0yePbwcH5LjjSBLTD3Xzg-PJeMA/edit?gid=1115838130#gid=1115838130)
- [Burnup Chart (progression sprints)](https://docs.google.com/spreadsheets/d/1TaTaBHQ5qRiTDNx_k_GWnCGMGh16XpRssx8894fMKX0/edit?gid=0#gid=0)
- [Trello (tâches temps réel)](https://trello.com/invite/b/69d3a5901cba4bed096fb9c5/ATTIe248703b23a4894b6a1f6664a1621e3648C2F2ED/uspv-judo-suivi-de-projet-gestion-de-taches-trello)

---

### Le Projet

Documenter la refonte intégrale du système d'information de l'Union Sportive de Pont-de-Roide Vermondans (USPV Judo). L'objectif est de remplacer l'actuel site statique obsolète par une plateforme complète gérant à la fois la partie visible par les utilisateurs et la logique serveur (application web dynamique en architecture Full-Stack) intégrant un outil de gestion interne (CRM associatif), développée dans le cadre d'un stage de 2ème année d'informatique.

### Enjeux et Objectifs

**Visibilité et Image** : Offrir une vitrine moderne, responsive et optimisée pour les moteurs de recherche (SEO) au grand public afin d'attirer de nouveaux licenciés.

**Efficacité Administrative** : Réduire drastiquement le temps de traitement des dossiers (actuellement chronophage) grâce à une procédure de pré-inscription 100% numérique pour les parents et un système de validation centralisé pour le bureau du club.

**Orientation Techniques et Sécurité** : L'application s'inscrit dans une architecture Full-Stack moderne. Les choix de mise en œuvre sont donnés ici comme orientations de conception et seront détaillés dans le Document d'Architecture Technique (DAT) ; ils pourront évoluer tant que les besoins métier du MVP restent couverts. Une attention critique est portée à la sécurité et à la conformité :

- **Protection des Données (RGPD)** : Aucune donnée médicale stockée en base, anonymisation post-inactivité et cloisonnement des données familiales (cf. section 4.5).
- **Sécurisation de l'Intranet** : Le socle garanti repose sur une authentification sécurisée et un contrôle d'accès strict ; le détail des niveaux de protection est donné en section 5.2.3.

### Périmètre Fonctionnel (MVP)

Compte tenu de la durée contrainte du stage, le développement se concentre strictement sur un **Périmètre Minimal Livrable (MVP)** vital pour l'entrée sportive :

- **Vitrine publique de base** : tunnel d'inscription numérique et intranet de gestion des dossiers
- **Authentification sécurisée**
- **Gestion administrative minimale** (consultation + validation des dossiers)

Le détail des fonctionnalités et leur niveau d'engagement (Garanti / Souhaité / Éventuel) sont donnés dans la **Tableau de priorisation fonctionnelle** (section 2.16).

### Déploiement et Pérennité

Le projet, piloté par Mehdi LAFAY, se déroulera d'avril à juin 2026. À l'issue du stage, l'association sera propriétaire de l'ensemble des livrables (code, base de données, Document d'Architecture Technique, manuel d'utilisation simplifié). Tout accompagnement post-livraison éventuel relève d'une démarche gracieuse distincte, hors engagement de délai ; si retenu, il pourra être précisé séparément après la livraison.

---

## Contexte

### Présentation de l'Association

L'USPV Judo (Union Sportive de Pont-de-Roide Vermondans) est le club historique de judo de la commune. L'association accueille des pratiquants de tous âges, allant de l'éveil judo (pour les enfants à partir de 6 ans) jusqu'aux adultes, en proposant des disciplines variées comme le judo et le jiu-jitsu. Le club possède une forte composante familiale ainsi qu'une section compétitive active.

### Objectifs de l'Association

Les objectifs que le club souhaite atteindre via cette nouvelle plateforme web sont les suivants :

- **Visibilité** : Se faire connaître localement pour attirer de nouveaux licenciés et faciliter l'accès à l'information (horaires, tarifs).
- **Image** : Moderniser l'image du club pour refléter son dynamisme.
- **Gestion interne** : Simplifier drastiquement les tâches administratives pour les membres du bureau (traitement des inscriptions, suivi des paiements, éditions d'attestations, communication ciblée).

**Objectif Principal (cible idéale)** :  
*L'objectif-cible de la plateforme est de permettre à un parent d'effectuer une pré-inscription complète en moins de 5 minutes, et à un administrateur de valider un dossier complet en moins de 2 minutes. Ces indicateurs constituent les objectifs de conception à viser lors du développement et des tests UX — ils ne représentent pas des engagements contractuels de livraison.*

### Présentation du Projet Web

Le projet concerne la refonte intégrale du site existant pour passer d'un simple site de présentation d'informations (site statique) à une véritable plateforme intelligente capable de traiter des données (application web dynamique en architecture Full-Stack) reposant sur un système de stockage de données organisé (base de données relationnelle).

### Existant dans l'Association

Le club dispose actuellement d'un site internet statique hébergé sur la plateforme gratuite Neocities. À l'heure actuelle, son accès est fortement restreint (protégé par un code d'accès lié à un QR code affiché physiquement au dojo), ce qui limite considérablement son trafic global (le compteur affiche environ 350 visites au total). Par ailleurs, la gestion des inscriptions se fait de manière traditionnelle via des formulaires PDF à imprimer et à rapporter, et la mise à jour des informations par le bureau s'avère complexe.

### Cibles du Projet Web

Afin de structurer le développement, les cibles de la plateforme ont été définies ainsi :

| Cible | Objectifs / Attentes | Priorité |
|-------|---------------------|----------|
| **Grand Public** | Découvrir le club, s'informer sur les horaires, effectuer une pré-inscription en ligne. | 1 |
| **Adhérents & Parents** | Initier une pré-inscription et obtenir une confirmation ; consulter, si ces rubriques sont livrées, le calendrier du club et le catalogue boutique ; un espace famille enrichi constitue une évolution ultérieure. | 2 |
| **Clubs invités** | Saisir directement leurs judokas lors des tournois organisés par le club dans une phase ultérieure. | 3 |

### User Stories Principales

Afin de cartographier précisément les fonctionnalités attendues, les besoins ont été traduits en "User Stories" selon une approche Agile :

#### Adhérents / Parents

- *En tant que parent, je veux* inscrire mon enfant en ligne **afin de** gagner du temps lors de l'inscription au club.
- *En tant que parent, je veux*, à terme, accéder à un espace famille **afin de** suivre les informations de mon enfant (grades, activités).
- *En tant que parent, je veux* recevoir une confirmation de pré-inscription **afin de** savoir que mon dossier a bien été pris en compte.
- *En tant que parent, je veux* pouvoir consulter les horaires et, selon la version livrée, les événements **afin d'** organiser les activités de mon enfant.

#### Grand public

- *En tant que visiteur, je veux* consulter les informations du club **afin de** découvrir les activités proposées.
- *En tant que visiteur, je veux* accéder facilement aux horaires et tarifs **afin de** décider de m'inscrire.
- *En tant que visiteur, je veux* effectuer une pré-inscription en ligne rapidement **afin de** rejoindre le club.

#### Administrateur (rôle attribué à un membre du bureau habilité)

- *En tant qu'administrateur, je veux* valider un dossier d'inscription **afin d'** achever son traitement administratif et si le module est livré, d'ouvrir l'accès à l'Espace Famille.
- *En tant qu'administrateur, je veux* consulter la liste des inscrits **afin de** gérer les adhérents.
- *En tant qu'administrateur, je veux*, si le niveau fonctionnel livré le permet, modifier ou supprimer un dossier **afin de** corriger des erreurs.
- *En tant qu'administrateur, je veux*, si le module boutique est livré, gérer les articles de la boutique **afin de** mettre à jour les informations.

#### Clubs invités (tournois)

- *En tant que club invité, je veux*, à terme, inscrire mes judokas en ligne **afin d'** éviter la double saisie.

### Matrice des Rôles et Droits

Le tableau ci-dessous synthétise les droits attendus par profil afin de clarifier les accès fonctionnels, les périmètres de consultation et les actions autorisées dans le système. Dans le MVP, le seul rôle privé d'administration retenu est le **Administrateur**, attribué à un membre du bureau habilité.

| Action / Droit | Grand Public | Parent | Administrateur | Club invité | Précision |
|---|---|---|---|---|---|
| Consulter les pages publiques | Oui | Oui | Oui | Oui | Accès libre à la vitrine publique. |
| Créer et soumettre une pré-inscription | Oui | Oui | Non | Non | Le formulaire public sert à ouvrir un nouveau dossier d'inscription. |
| Consulter les informations liées à sa famille | Non | Partiel | Oui | Non | Réservé au parent authentifié pour ses propres données si le module est livré ; l'administrateur consulte les dossiers via l'intranet. |
| Accéder à l'intranet d'administration | Non | Non | Oui | Non | Accès soumis au minimum à une authentification sécurisée ; une restriction réseau complémentaire (IP/VPN) pourra être ajoutée selon l'environnement d'exploitation. |
| Modifier le contenu public et le catalogue | Non | Non | Oui | Non | Réservé au rôle Administrateur. |
| Valider ou rejeter un dossier | Non | Non | Oui | Non | Action strictement réservée au rôle Administrateur. |
| Saisir des combattants pour un tournoi (si module livré) | Non | Non | Oui | Oui | Le club invité intervient uniquement via un lien temporaire restreint ; l'administrateur supervise et clôture. |

---

## Cas d'Usage Précis

Ces scénarios détaillent le comportement attendu de l'application pour les fonctionnalités critiques du système.

### Cas d'usage 1 : Inscription d'un enfant

**Acteur** : Parent  
**Objectif** : Inscrire un enfant au club  
**Scénario principal** :

1. Le parent accède à la page d'inscription.
2. Il remplit le formulaire (infos enfant + représentant légal).
3. Il confirme avoir pris connaissance de la politique de confidentialité, accepte le règlement intérieur et, le cas échéant, exprime son choix relatif au droit à l'image.
4. Il valide le formulaire.
5. Le système enregistre les données avec un statut "en attente".
6. Le parent reçoit une confirmation.

**Résultat attendu** : L'enfant est pré-inscrit, le dossier est en attente de validation physique au dojo.

**Scénarios alternatifs** :

- **Doublon d'email (fratrie)** : Si un représentant avec la même adresse email existe déjà en base, le système réutilise automatiquement le représentant existant et rattache le nouveau dossier à celui-ci (Garanti). Le parent n'a pas à ressaisir ses coordonnées identiques ; un message informatif l'avertit que ses informations de contact ont été reconnues. Ce comportement anticipe la gestion multi-enfant post-MVP et évite la duplication de données.

- **Erreur serveur ou perte de connexion** : En cas d'indisponibilité de l'API ou de coupure réseau pendant la soumission, un message générique invite le parent à vérifier sa connexion et à ressayer ; les données saisies restent conservées dans le formulaire.

- **Champs invalides** : La soumission est bloquée et des messages d'erreur ciblés s'affichent sur chaque champ concerné.

### Cas d'usage 2 : Validation d'un dossier

**Acteur** : Administrateur  
**Scénario principal** :

1. L'administrateur se connecte à l'interface de gestion (Intranet).
2. Il accède à la liste des dossiers en attente.
3. Il sélectionne un dossier spécifique.
4. Il vérifie la réception des documents physiques (certificat, paiement).
5. Il valide le dossier via un bouton d'action.

**Résultat attendu** : Le dossier passe en statut "validé" et peut ouvrir, selon la version livrée, les droits d'accès à l'Espace Famille.

**Scénarios alternatifs** :

- **Pièces manquantes** : L'administrateur constate l'absence d'un document physique et passe le dossier en statut *Incomplet* avec une note de suivi.

- **Doublon détecté** : Si le dossier semble faire doublon avec un dossier existant, l'administrateur peut le rejeter avec le motif « doublon ».

### Cas d'usage 3 : Accès à l'Espace Famille (cible post-MVP)

**Acteur** : Parent (Adhérent actif)  
**Principe** : Le parent authentifié accède à un espace privé lui permettant donc de consulter les informations restreintes de sa famille (carnet et grades, documents). Ce module ne fait pas partie du périmètre **Garanti** ; sa spécification détaillée sera produite si et quand il est priorisé.

### Cas d'usage 4 : Tentative d'accès non autorisé (Sécurité)

**Acteur** : Utilisateur non connecté / Malveillant  
**Scénario principal** :

1. L'utilisateur tente d'accéder directement à une route protégée de l'API (ex: appel vers les grades).
2. Le serveur intercepte la requête et vérifie le token d'authentification.
3. Le token est absent ou invalide.
4. Le serveur refuse la requête.

**Résultat attendu** : L'API renvoie une erreur 401 *Unauthorized*, assurant le refus d'accès à la ressource concernée ; ce comportement fait l'objet d'une validation ciblée lors de la recette, et hors engagement de délai ; si l'utilisation correspondant est en place, par tests automatisés.

**Scénarios alternatifs** :

- **Token expiré** : L'administrateur est redirigé vers la page de connexion avec un message indiquant que la session a expiré.

- **Tentatives répétées** : Après plusieurs accès refusés depuis la même IP, le système applique un ralentissement temporaire (rate-limiting).

### Cas d'usage 5 : Consultation des articles (boutique — module souhaité)

**Acteur** : Adhérent / Visiteur  
**Scénario principal** :

1. L'utilisateur accède à la page de la boutique.
2. Il consulte les fiches détaillées des articles.
3. Il visualise les tarifs et, lorsqu'elles sont renseignées, les tailles indicatives mentionnées dans la description de l'article.
4. Il contacte le club pour passer commande physiquement.

**Résultat attendu** : Si le module est livré, la consultation reste simple et ergonomique, sans gestion de panier ni de paiement en ligne.

**Scénarios alternatifs** :

- **Article indisponible** : Si un article est retiré du catalogue par l'administrateur, l'accès à sa fiche redirige vers le catalogue avec un message informatif.

---

## Spécifications Générales

### Contenu et Arborescence

L'arborescence ci-dessous décrit la cible fonctionnelle du produit. Seules les rubriques rattachées à des fonctionnalités classées **Garanti** relèvent du socle de livraison ; les autres décrivent une cible produit ou une extension.

| Thème | Sous-thème | Description / But de la rubrique |
|-------|-----------|----------------------------------|
| **Accueil** | — | Informations essentielles du club et, selon l'avancement du projet, mise en avant d'alertes importantes ou indication de statut pour le "Direct du Dojo". |
| **Le Club** | Disciplines & Judoka | Histoire, disciplines (judo, jiu-jitsu), Code Moral, hygiène, règlement d'arbitrage. |
| **Infos Pratiques** | Entraînements | Tableaux dynamiques des horaires (Éveils, Adultes et Jiu-Jitsu) et présentation publique des tarifs applicables. |
| **Événements** | Compétitions | Calendrier des tournois et résultats avec photos intégrées si le module de contenu correspondant est livré. |
| **Boutique** | Catalogue | Vitrine informative des équipements du club si le module boutique est livré. Commandes groupées gérées via le secrétariat, la page de contact ou les réseaux sociaux. |
| **Inscriptions** | Formulaire | Pré-inscription 100% numérique pour les nouveaux membres. |
| **Espace Famille** | Accès privé | Espace privé réservé aux licenciés si ce module éventuel est livré ; version enrichie prévue en dehors du MVP initial. |
| **Contact** | Nous joindre | Formulaire, email officiel, liens vers les réseaux sociaux. |

### Contenu de la Page d'Accueil

La page d'accueil sera la vitrine principale. Le socle garanti couvrira l'accès clair aux informations essentielles du club, notamment les informations pratiques, les tarifs publics et le parcours de pré-inscription. Selon l'avancement du projet, elle pourra en outre intégrer :

- Un bloc "Informations Importantes" éventuellement administrable (ex: alertes d'annulation de cours) si le module de contenu est livré.

- Un bloc indiquant le statut de la diffusion "Le Direct du Dojo" (En attente / En ligne) si cette fonctionnalité est retenue.

- La mise en avant d'actualités, de résultats sportifs récents et d'une galerie photo si le module de contenu correspondant est livré.

### Design et Graphisme

La charte graphique sera pensée pour refléter l'esprit martial. Les couleurs dominantes devront correspondre à l'identité visuelle historique du club et à son logo. L'interface devra être moderne, épurée et offrir une navigation intuitive.

### Accessibilité Web

Sans viser une conformité RGAA ou WCAG complète, l'application respectera les bonnes pratiques d'accessibilité de base afin de garantir une expérience correcte au plus grand nombre :

- Contrastes de couleurs suffisants entre le texte et l'arrière-plan (ratio minimal de 4,5:1 pour le texte courant).

- Navigation au clavier fonctionnelle sur les parcours critiques (formulaire d'inscription, connexion administration).

- Attributs `alt` renseignés sur les images porteuses de sens et structure sémantique HTML cohérente (`h1`–`h3`, `nav`, `main`, `footer`).

- Taille de police et zones tactiles adaptées à un usage mobile.

### Protection des Données et Conformité RGPD

- Aucune donnée médicale stockée en base de données ; anonymisation post-inactivité et cloisonnement des données familiales (cf. section 4.5).
- Sécurisation de l'Intranet : Le socle garanti repose sur une authentification sécurisée et un contrôle d'accès strict ; le détail des niveaux de protection est donné en section 5.2.3.

### Schéma d'Architecture Globale

```
Interface visible (site web public et espace privé)
         ↓
Serveur de traitement sécurisé (API métier)
         ↓
Système de stockage organisé (Base de données relationnelle)
```

Ce flux représente le fonctionnement principal : l'utilisateur interagit avec l'interface, le serveur traite les règles métier (l'API), puis enregistre les informations de manière sécurisée (persistance en base).

### Stratégie de Référencement (SEO)

Pour un projet local associatif, la stratégie SEO reste volontairement simple et pragmatique. L'objectif est d'assurer une bonne indexation des pages clés sans multiplier les couches techniques.

**Optimisation de l'indexation** :

- **Base SEO** : Les pages publiques devront être rendues de manière lisible pour les moteurs de recherche, quel que soit l'outillage exact retenu au moment de l'implémentation.

- **Périmètre utile** : Les routes publiques effectivement livrées sont indexables, à minima Accueil, Le Club, Infos Pratiques, Inscriptions et Contact, ainsi que, le cas échéant, Événements et Boutique. Les routes privées suivantes sont explicitement **exclues** :
  - `/espace-famille` et toutes ses sous-routes (grades, photos, accès au flux vidéo).
  - `/admin` et toutes les routes de l'intranet. Ces routes resteront protégées par authentification et contrôle d'accès côté serveur.

- **Référencement essentiel** : Balises `title`, `description`, `sitemap.xml` et `robots.txt` correctement configurés.

- **SEO local — mots-clés ciblés** : Les pages stratégiques (accueil, inscriptions, infos pratiques) intégreront des expressions de longue traîne ancrées dans le territoire : "judo enfant Pont-de-Roide, cours judo Pays de Montbéliard, inscription judo Doubs 2026, club judo 6 ans Franche-Comté, jiu-jitsu adultes 25…". Ces mots-clés seront intégrés naturellement dans les titres `h1`/`h2`, les descriptifs méta et les textes de page.

**Contenu, maillage interne et performance** :

- **Maillage interne** : Les pages livrées seront reliées de manière cohérente (accueil → inscriptions, infos pratiques → horaires, etc.) afin d'améliorer la navigation et l'exploration par les robots de recherche.

- **Publications d'actualités** : Si le module correspondant est livré, les compte-rendus de compétitions et annonces d'étapes constitueront des pages indexables supplémentaires.

- **Données structurées (JSON-LD)** : Balises JSON-LD (schéma `SportsClub` / `LocalBusiness`) envisagées pour enrichir les résultats Google. *Hors scope MVP si la complexité est excessive ; priorité aux balises méta de base.*

- **Performance des médias** : Images compressées et services en formats modernes pour un chargement rapide, critère important pour le référencement.

---

## Critères de Validation et Indicateurs de Qualité

Cette section distingue trois niveaux complémentaires : la **recette fonctionnelle du socle Garanti**, seule opposable pour la validation de livraison ; les **cibles de qualité de conception**, utiles pour guider les arbitrages techniques ; et les **KPI post-mise en production**, utiles pour le pilotage dans la durée. Sauf mention contraire, seule la recette du socle **Garanti** conditionne l'acceptation de la livraison.

### Recette Fonctionnelle du MVP

La recette du MVP portera en priorité sur la validation des comportements suivants :

- Le visiteur peut consulter la vitrine publique, les informations pratiques, les tarifs publics et le tunnel de pré-inscription.

- Le formulaire accepte une saisie valide, enregistre le dossier en statut *En attente* après acceptation des consentements obligatoires, puis affiche une confirmation claire.

- Une saisie invalide bloque la soumission et affiche des messages d'erreur compréhensibles.

- Le bureau peut accéder à l'intranet, consulter les dossiers et faire évoluer leur statut vers *Valide*, *Incomplet* ou *Rejeté*.

- Toute tentative d'accès à une ressource privée sans droit valide est refusée.

---

## Déploiement et Pérennité

Le projet est piloté par Mehdi LAFAY se déroulera d'avril à juin 2026. À l'issue du stage, l'association sera propriétaire de l'ensemble des livrables (code, base de données, Document d'Architecture Technique, manuel d'utilisation simplifié). Tout accompagnement post-livraison éventuel relève d'une démarche gracieuse distincte, hors engagement de délai ; si retenu, il pourra être précisé séparément après la livraison.

---

## Glossaire

- **Garanti** : Élément du socle MVP considéré comme un engagement de livraison pendant le stage.
- **Souhaité** : Cible de réalisation si l'avancement reste conforme ; son absence ne bloque pas la recette du socle MVP.
- **Éventuel** : Hors engagement de livraison pendant le stage. Léger, optionnel ou post-MVP sans engagement de réalisation sur la période de stage.
- **Pré-inscription** : Formulaire en ligne permettant au parent de saisir les informations de sa famille et de son enfant avant validation par le bureau.
- **Dossier** : Ensemble des données et documents liés à une pré-inscription en attente ou validée.
- **Intranet** : Interface d'administration accessible aux membres du bureau habilités après authentification.
- **Espace Famille** : Espace privé (cible éventuelle) permettant aux parents licenciés d'accéder aux informations de sa famille.

---

**Mehdi LAFAY** — *Stage BUT2 Informatique* — *Juin 2026*
