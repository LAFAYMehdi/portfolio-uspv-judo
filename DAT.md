# Document d'Architecture Technique (DAT)
## Site Web USPV Judo — Refonte Application

> **Version condensée — non officielle.** Ce document est un aperçu synthétique
> destiné à la lecture en ligne. La **version officielle**, mise en forme et
> imprimée, est le PDF [`DAT-officiel.pdf`](DAT-officiel.pdf) (seul document de
> référence). Voir aussi le [`CDC-officiel.pdf`](CDC-officiel.pdf).

**Auteur** : Mehdi LAFAY  
**Superviseur technique** : David LECOCQ  
**Formation** : BUT Informatique — 2ᵉ année | IUT Belfort-Montbéliard  
**Période du stage** : 7 avril — 5 juin 2026  
**Status** : Document de travail — évolutif pendant le stage

**Document lié** : Cahier des charges USPV Judo (CDC)  
**Date** : 10 avril 2026  
**Dernière mise à jour** : Juin 2026 (fin de stage)

---

## Évolution technique vs. prévisions initiales

Ce DAT a été rédigé au démarrage du stage (10 avril 2026) et évolutif. Les choix techniques ont connu des affinements suite à la prise en main réelle du projet :

### Stack initiale vs. réalité implémentée

| Aspect | Prévu | Implémenté | Raison |
|--------|-------|-----------|--------|
| **Moteur serveur (Runtime backend)** | Express classique | **Moteur optimisé Nitro** (Nuxt runtime) | Tout est dans un seul langage (cohérence fullstack), plus rapide (perf) |
| **Affichage (Rendu frontend)** | Chargement côté navigateur (SPA/CSR) | **Hybride Serveur/Navigateur (SSR/CSR)** | Meilleur référencement (SEO natif) pour le public, fluidité (SPA) pour l'intranet |
| **Stockage du jeton (Stockage JWT)** | Stockage local vulnérable (localStorage) | **Cookie protégé (httpOnly cookie)** | Protection contre le vol de session (Sécurité XSS) |
| **Suivi du projet (Gestion tâches)** | Tableau manuel (Kanban) | **Trello** (synchronisé) | Suivi visuel et collaboratif en temps réel |
| **Déploiement automatique (CI/CD)** | Scripts manuels | **GitHub Actions** | Automatisation des tests et de la mise en ligne |
| **Vérifications (Tests)** | Tests de code (Unitaires/Vitest) | **Tests de code + Parcours réels (Unitaires + E2E Playwright)** | Vérification du serveur (API) et des actions utilisateurs |
| **Sauvegardes (BD)** | Programmation locale (Cron) | **Sauvegarde automatisée sur le cloud (pg_dump + S3)** | Sécurité et récupération rapide en cas de panne (Redondance) |

### Modules livrés (MVP)

**Vitrine publique** — Pages web publiques préchargées sur le serveur (rendues SSR via Nuxt)  
**Passerelle de communication (API REST)** — 15 points d'accès (endpoints : auth, inscriptions, dossiers, admin)  
**Espace de gestion (Intranet admin)** — Application réactive sécurisée (SPA avec jetons JWT + rôles)  
**Stockage (Base PostgreSQL)** — 24 tableaux, avec garantie d'enregistrement fiable (transactions ACID)  
**Connexion (Authentification)** — Mots de passe brouillés (bcrypt) + Jetons de session sécurisés (JWT signé)  
**Hébergement (Déploiement)** — Serveur dédié (VPS Linux) + Routage sécurisé (Nginx + Let's Encrypt)  
**Automatisation (CI/CD)** — Processus GitHub Actions (analyse de code, compilation, test, mise en ligne)

### Modules reportés (post-MVP)

**Espace Famille** — Reporté (nécessite UX parent supplémentaire)  
**Boutique** — Gestion catalogue admin en place, front optionnel  
**Direct du Dojo** — Flux vidéo (infrastructure VPS insuffisante initiale)  
**Tournois** — Module structuré, saisie clubs invités (future phase)

### Ressources de suivi actualisées

- [Burnup Chart (réel vs. prévisions)](https://docs.google.com/spreadsheets/d/1TaTaBHQ5qRiTDNx_k_GWnCGMGh16XpRssx8894fMKX0/edit?gid=0#gid=0)
- [Planning réel](https://docs.google.com/spreadsheets/d/1ox_GHF1bHFgtLE5o0yePbwcH5LjjSBLTD3Xzg-PJeMA/edit?gid=1115838130#gid=1115838130) vs. [Planning prévisionnel](https://docs.google.com/spreadsheets/d/1rZnGPkroLn90yTaOGX1LJBWGLkimmtp0x-oJm25Cf7E/edit?gid=1115838130#gid=1115838130)
- [Trello — Suivi des tâches (temps réel)](https://trello.com/invite/b/69d3a5901cba4bed096fb9c5/ATTIe248703b23a4894b6a1f6664a1621e3648C2F2ED/uspv-judo-suivi-de-projet-gestion-de-taches-trello)

---

## Table des matières

1. [Introduction et Contexte](#introduction-et-contexte)
2. [Architecture Générale](#architecture-générale)
3. [Détail des Composants](#détail-des-composants)
4. [Base de Données](#base-de-données)
5. [Sécurité](#sécurité)
6. [Flux Métier Clés](#flux-métier-clés)
7. [Déploiement et DevOps](#déploiement-et-devops)
8. [Décisions Architecturales](#décisions-architecturales)
9. [Points Remarquables](#points-remarquables-et-optimisations)
10. [Contraintes et Limitations](#contraintes-et-limitations)
11. [Évolutions Futures](#évolutions-futures)

---

## Introduction et Contexte

### Objectif du projet

Le site **USPV Judo** est la plateforme numérique de gestion et de promotion du club historique de judo de Pont-de-Roide-Vermondans. Le projet vise à :

- Créer une présence web professionnelle et accessible
- Mettre en place un système d'inscription et de gestion des adhérents
- Permettre la gestion de l'agenda des séances et tournois
- Assurer la sécurité des données personnelles (RGPD)
- Automatiser les processus d'adhésion et de paiement

### Périmètre technique

| Domaine | Technologie |
|---------|-------------|
| **Frontend** | Nuxt 3 (Vue 3) + TailwindCSS |
| **Backend** | Node.js (Nitro runtime) |
| **Base de données** | PostgreSQL 14+ (24 tables) |
| **Sécurité** | JWT + bcrypt + middleware CSRF |
| **Déploiement** | VPS Linux + GitHub Actions CI/CD |
| **Versioning** | Git / GitHub |

---

## Architecture Générale

### Vue d'ensemble

```
┌─────────────────────────────────────────┐
│         Navigateur (Client)             │
│         Nuxt 3 SPA (Vue 3)              │
│         - Pages publiques               │
│         - Formulaires réactifs          │
│         - Gestion d'état (Pinia)        │
└──────────────┬──────────────────────────┘
               │ HTTPS / REST API
┌──────────────▼──────────────────────────┐
│      Serveur Nitro (Node.js)            │
│      - Routes API (/api/...)            │
│      - Middleware (JWT, CORS, CSRF)     │
│      - Logique métier                   │
│      - Sessions utilisateur             │
└──────────────┬──────────────────────────┘
               │ TCP/5432
┌──────────────▼──────────────────────────┐
│       PostgreSQL                        │
│       - Familles (adhérents)            │
│       - Inscriptions                    │
│       - Sessions de judo                │
│       - Tournois                        │
└─────────────────────────────────────────┘
```

### Fonctionnement global (Modèle Client-Serveur)

- **Appareil de l'utilisateur (Client)** : L'interface visuelle s'exécute directement dans le navigateur internet de l'utilisateur (Application Nuxt 3 / SPA).
- **Passerelle de traitement (API)** : Les requêtes (endpoints RESTful) sont gérées par le cerveau de l'application situé sur notre serveur (Serveur Nitro).
- **Lieu de stockage (Base de données)** : Le coffre-fort des informations (PostgreSQL) est centralisé et uniquement accessible par notre serveur pour une sécurité maximale.

---

## Détail des Composants

### Frontend (Nuxt 3 + Vue 3)

#### Structure du projet

```
nuxt-app/
├── pages/                    # Pages publiques
│   ├── index.vue            # Accueil
│   ├── inscription.vue      # Formulaire d'inscription
│   └── planning.vue         # Calendrier séances/tournois
├── components/              # Composants réutilisables
│   ├── InscriptionForm.vue
│   ├── SessionCard.vue
│   └── TournamentTable.vue
├── composables/             # Logique métier réutilisable
│   ├── useAuth.ts           # Authentification
│   └── useFormValidation.ts # Validation formulaires
├── stores/                  # État global (Pinia)
│   ├── auth.ts              # Utilisateur courant
│   └── sessions.ts          # Séances/tournois
└── middleware/              # Middleware client
    └── auth.ts              # Garde routes protégées
```

#### Technos clés

- **Nuxt 3** : Framework fullstack Vue avec routing automatique
- **Vue 3 Composition API** : Logique réutilisable via composables
- **Pinia** : Store global pour authentification et données session
- **TailwindCSS** : Framework CSS utilitaire, responsive first
- **Form Validation** : Règles côté client + messages d'erreur en temps réel

---

### Backend (Nitro)

#### Architecture

```
server/
├── api/                    # Endpoints API
│   ├── auth.ts            # Login / register
│   ├── inscriptions/       # CRUD inscriptions
│   ├── families/           # Gestion adhérents
│   ├── sessions/           # Planning séances
│   └── tournaments/        # Gestion tournois
├── middleware/            # Middleware global
│   ├── auth.ts            # Vérification JWT
│   ├── csrf.ts            # Protection CSRF
│   └── cors.ts            # CORS policy
├── utils/                 # Utilitaires
│   ├── db.ts              # Pool PostgreSQL
│   └── crypto.ts          # Hash bcrypt, JWT
└── types/                 # TypeScript types
    └── models.ts          # Interfaces DB
```

#### Flux d'authentification

1. Client envoie `POST /api/auth/login` avec identifiant + mot de passe
2. Serveur requête `SELECT FROM famille WHERE email = ...`
3. Vérification du hash bcrypt du mot de passe
4. Génération JWT signé (payload : id, email, rôle)
5. Client stocke le JWT en localStorage
6. Requêtes suivantes incluent `Authorization: Bearer <JWT>`
7. Middleware `auth.ts` valide la signature JWT à chaque requête

#### Endpoints principaux

| Méthode | Route | Authentification | Description |
|---------|-------|------------------|-------------|
| `POST` | `/api/auth/login` | Non | Connexion |
| `POST` | `/api/auth/register` | Non | Création compte |
| `POST` | `/api/inscriptions` | Oui | Nouvelle inscription |
| `GET` | `/api/inscriptions/:id` | Oui | Détails inscription |
| `GET` | `/api/sessions` | Non | Planning public |
| `POST` | `/api/tournaments` | Oui (admin) | Créer tournoi |

---

## Base de Données

### Schéma relationnel

Le schéma PostgreSQL compte **24 tables** réparties en 4 domaines :

#### Domaine Adhérents
- `famille` — Responsables légaux
- `representant` — Contact supplémentaire
- `enfant` — Judokas à inscrire
- `contact` — Téléphones/emails supplémentaires

#### Domaine Inscriptions
- `inscription` — Demande d'inscription (fact table)
- `inscription_detail` — Détails par enfant
- `forfait` — Forfaits tarifaires (mensuel, annuel…)
- `paiement` — Historique des paiements

#### Domaine Séances
- `session` — Séances de judo (jour, horaire, salle)
- `session_presence` — Présence judoka à une séance
- `ceinture` — Niveaux (blanc, jaune, verte, bleue, noire)
- `salle` — Salles disponibles

#### Domaine Tournois
- `tournoi` — Événements compétitifs
- `tournoi_inscription` — Inscription d'un judoka à un tournoi
- `categorie` — Catégories d'âge/poids
- `classement` — Résultats finaux

### Exemple : Table `famille`

```sql
CREATE TABLE famille (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100),
  telephone VARCHAR(20),
  adresse TEXT,
  actif BOOLEAN DEFAULT true,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_famille_email ON famille(email);
CREATE INDEX idx_famille_actif ON famille(actif);
```

### Intégrité des données

#### Contraintes d'intégrité

- **PRIMARY KEY** : Identifiants uniques
- **UNIQUE** : Email sans doublon (login)
- **FOREIGN KEY** : Références parent-enfant (famille → enfant, inscription → forfait…)
- **CHECK** : Validations (e.g. `age >= 0`, `places_restantes >= 0`)
- **NOT NULL** : Champs obligatoires

#### Transactions ACID

Les opérations critiques (inscription + paiement) utilisent `BEGIN TRANSACTION` :

```sql
BEGIN;
  INSERT INTO inscription (famille_id, forfait_id) VALUES (123, 5);
  INSERT INTO inscription_detail (inscription_id, enfant_id) VALUES (...);
  UPDATE forfait SET places_restantes = places_restantes - 1;
  -- Si une erreur survient ici, le ROLLBACK automatique annule tout
COMMIT;
```

Ceci garantit que l'inscription soit **atomique** (tout ou rien) et évite les incohérences lors d'accès concurrents (race conditions).

---

## Sécurité

### Authentification et Autorisation

#### JWT (JSON Web Token)

- **Payload** : `{id, email, role, iat, exp}`
- **Signature** : HMAC-SHA256 avec clé secrète serveur
- **Durée de vie** : 24 heures
- **Revocation** : Table `token_revoked` pour déconnexions urgentes

Exemple JWT décodé :

```json
{
  "id": 42,
  "email": "user@exemple.com",
  "role": "user",
  "iat": 1655312400,
  "exp": 1655398800
}
```

#### Mot de passe

- **Hachage** : bcrypt avec salt 10 rounds
- **Jamais stocké en clair** en base de données
- **Validation** : regex email + longueur minimale 12 caractères
- **Changement** : Via route sécurisée `/api/auth/change-password` (authentification requise)

### Protection contre les attaques

| Menace | Protection | Implémentation |
|--------|-----------|-----------------|
| **SQL Injection** | Prepared Statements | `parameterized queries` (no string concatenation) |
| **XSS** | Content Security Policy | Headers HTTP `Content-Security-Policy` |
| **CSRF** | CSRF Token + SameSite | Middleware `csrf.ts`, cookie `SameSite=Strict` |
| **Brute Force** | Rate Limiting | Middleware rate-limit (max 5 tentatives/5 min) |
| **Exposition de secrets** | Variables d'environnement | `.env` (non versionné) |

### RGPD et Données personnelles

- Les données des enfants et responsables sont **chiffrées en transit** (HTTPS/TLS 1.2+)
- **Droit à l'oubli** : Endpoint `DELETE /api/families/:id` supprime toutes les données associées
- **Durée de conservation** : 3 ans après dernière inscription (puis suppression automatique)
- **Accord explicite** : Checkbox RGPD/Conditions au moment de l'inscription
- **Traçabilité** : Logs d'accès aux données sensibles (audit trail)

---

## Flux Métier Clés

### Flux 1 : Inscription en ligne

```
1. Client accède /inscription
   └─ Page de formulaire réactive (Vue 3)

2. Remplissage du formulaire
   └─ Validation côté client : email valide, données obligatoires
   └─ Messages d'erreur affichés en temps réel

3. Soumission POST /api/inscriptions
   └─ Corps : {famille, enfants[], forfait_id}

4. Validation côté serveur (défensive)
   └─ Vérification email unique
   └─ Vérification forfait existe
   └─ Vérification places disponibles

5. Transaction atomique
   └─ Création famille (si new) + hash bcrypt du mot de passe
   └─ Création enfants associés
   └─ Création inscription + détails
   └─ Décrément places_restantes du forfait

6. Réponse HTTP 201
   └─ Numéro de dossier
   └─ Récapitulatif inscription

7. Email de confirmation
   └─ Service SMTP envoie confirmation + facture
```

### Flux 2 : Gestion du planning

```
1. Admin crée une séance
   └─ POST /api/sessions (authentification + rôle admin requis)
   └─ Données : salle, date, horaire, ceinture_min (niveau minimum)

2. Clients consultent le planning
   └─ GET /api/sessions/public
   └─ Filtrés par date et accessibles (ceinture match)
   └─ Affichage avec places disponibles

3. Presence enregistrée
   └─ POST /api/sessions/:id/attendance (admin)
   └─ Paramètres : {judoka_id, present: boolean}

4. Rapports
   └─ Dashboard admin affiche taux de présence par session
```

---

## Déploiement et DevOps

### Infrastructure

- **VPS** : Serveur Linux (Ubuntu 22.04+)
- **Node.js** : Runtime Nitro en tant que service systemd
- **PostgreSQL** : DBMS en conteneur Docker ou installé natif
- **Nginx** : Reverse proxy, SSL/TLS, gestion des domaines
- **DNS** : Domaine `uspv-judo.fr` pointant vers VPS

### Processus CI/CD

```bash
# 1. Push sur GitHub
git push origin main

# 2. GitHub Actions trigger workflow
#    - Lint (ESLint, Prettier)
#    - Build (nuxi build)
#    - Tests (si existants)
#    - Deploy (SSH vers VPS)

# 3. Sur VPS :
#    - Pull du code depuis GitHub
#    - npm install
#    - npm run build
#    - Restart du service Node.js
#    - Health check : curl /api/health

# 4. GitHub Pages
#    - Déploiement statique du rendu (futur SSR)
```

### Monitoring et Logs

- **Logs centralisés** : stdout → systemd journal
- **Alertes** : Crash du service Node.js triggère notification (email/Slack)
- **Health check** : Endpoint `GET /api/health` vérifie la connexion BD
- **Backup BD** : Script cron `pg_dump` quotidien → stockage AWS S3

---

## Décisions Architecturales

### Pourquoi Nuxt 3 + Nitro ?

| Critère | Justification |
|---------|---------------|
| Framework fullstack | Client + API dans un même projet → déploiement unifié |
| Routing automatique | Directories `pages/` et `api/` auto-compilées |
| SSR optionnel | Rendu serveur pour SEO (préparation pour futur) |
| TypeScript natif | Type-safety sur client et serveur |
| Écosystème Vue | Composants + stores Pinia cohérents |

### Pourquoi PostgreSQL plutôt que NoSQL ?

- **Relations complexes** : Familles → Enfants → Inscriptions → Forfaits (arborescence)
- **Intégrité référentielle** : Les contraintes FOREIGN KEY évitent les données orphelines
- **Transactions ACID** : Critiques pour inscriptions atomiques (tout ou rien)
- **Requêtes complexes** : JOINs sur plusieurs tables (rapports d'adhésion, présences…)
- **Maturité** : Stabilité et performance éprouvées en production

### Authentification sans session serveur

- **JWT stateless** : Pas de stockage de session en mémoire/Redis
- **Scalabilité** : Chaque serveur peut valider le JWT indépendamment
- **Revocation** : Table `token_revoked` pour déconnexions urgentes (logout)
- **Alternative future** : Sessions en Redis si besoin de contrôle fin (kick users, limiter sessions/user…)

---

## Points Remarquables et Optimisations

### Gestion des erreurs

```typescript
// Exemple endpoint sécurisé
POST /api/inscriptions
  1. Validation côté client (feedback immédiat)
  2. Validation côté serveur (défensive) ← jamais faire confiance au client
  3. Try/catch autour de la transaction
  4. Rollback automatique en cas d'erreur
  5. Réponse HTTP 400/500 avec message d'erreur structuré (ne pas exposer stack trace)
```

### Performance

- **Indexes PostgreSQL** : Sur email (unique), id famille (FK), dates (range queries)
- **Compression** : Gzip des réponses API et assets statiques
- **Cache client** : Assets immuables (cache-busting par hash)
- **Lazy loading** : Composants Nuxt chargés à la demande
- **Pagination** : Listes longues (sessions, inscriptions) paginées côté API

### Maintenance et Documentation

- Code source commenté (pourquoi, pas quoi)
- Schéma BD documenté (diagramme ERD)
- README avec instructions de déploiement
- Changelog Git (commits explicites, messages structurés)
- Scripts de migration BD (versionnées dans le repo)

---

## Contraintes et Limitations

- **VPS unique** : Pas de haute disponibilité (pas de cluster, pas de failover)
- **Stockage fichiers** : Pas encore de gestion d'image (avatar, scan diplôme)
- **Notifications** : Email uniquement, pas de SMS ni push notifications
- **Statistiques** : Pas de BI ou analytics avancée (Metabase, Grafana…)
- **Intégration paiement** : Formulaire d'inscription seulement, pas de paiement en ligne (Stripe/PayPal futur)

---

## Évolutions Futures

1. **API mobile** — Application iOS/Android avec authentification JWT partagée
2. **Paiement en ligne** — Intégration Stripe / PayPal pour règlement forfaits
3. **Gestion de fichiers** — Upload avatar, certificat médical, scan identité (S3)
4. **Système de notations** — Évaluation des judokas, suivi de progression
5. **Clustering et HA** — Réplication BD, load balancer, haute disponibilité
6. **Analytics** — Dashboard admin avec rapports d'inscription, taux de présence, churn…
7. **Notifications push** — Alertes séances, rappels inscription
8. **Module tournoi avancé** — Affichage brackets, live scoring, classement

---

## Conclusion

L'architecture du site USPV Judo repose sur une **stack moderne et robuste** :

- **Frontend** : SPA réactive (Nuxt 3 / Vue 3 + Pinia)
- **Backend** : API RESTful sécurisée (Nitro avec JWT + bcrypt)
- **Données** : Modèle relationnel cohérent et atomique (PostgreSQL 24 tables)
- **Déploiement** : CI/CD automatisé (GitHub Actions)

Cette architecture garantit la **scalabilité**, la **sécurité** et la **maintenabilité** du système pour accueillir la croissance future du club USPV Judo.

---

**Mehdi LAFAY**  
*Stage BUT2 Informatique*  
*IUT Belfort-Montbéliard*  
*Juin 2026*
