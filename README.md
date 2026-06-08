# Portfolio de Stage BUT2 — USPV Judo

Portfolio de stage de **Mehdi LAFAY** | BUT Informatique — 2ᵉ année | IUT Belfort-Montbéliard

**Stage du 7 avril au 5 juin 2026** pour le club **USPV Judo** (Pont-de-Roide-Vermondans).

---

## À propos

Ce portfolio présente les **savoir-faire techniques** et **savoir-faire généraux** développés lors de mon stage de conception et développement du site web du club USPV Judo.

### Structure

Le portfolio s'organise en **4 pages** :

1. **Accueil** — Présentation générale du projet, architecture et contexte du club
2. **Technique** — 6 traces couvrant les trois grands domaines (base de données, back-end sécurisé, front-end) + bilan
3. **Suivi de projet** — Analyse des besoins, journal de bord Kanban, gestion de projet + bilan
4. **Intégration en entreprise** — Environnement de travail, déploiement CI/CD + bilan

Chaque page affiche **une sous-page (trace ou bilan) à la fois** via une navigation par onglets.

---

## Lancer en local

Site statique, sans dépendance ni build.

```bash
git clone https://github.com/LAFAYMehdi/portfolio-uspv-judo.git
cd portfolio-uspv-judo

# Lancer un serveur local
python3 -m http.server 8800

# Ouvrir http://localhost:8800 dans le navigateur
```

**Note** : La navigation entre les pages est gérée directement dans le navigateur sans recharger la page (routage par ancre `#/accueil`, `#/technique/trace-1`, …). Il n'y a donc pas besoin de configuration complexe côté serveur — le site fonctionne tel quel sur n'importe quel hébergeur basique.

---

## Outils et Technologies (Technologies du projet USPV Judo)

- **Interface utilisateur (Frontend)** : Nuxt 3 (Vue 3) pour l'affichage, et TailwindCSS pour la décoration et la mise en page.
- **Logique serveur (Backend)** : Node.js (Nitro) et Express pour gérer les actions en arrière-plan.
- **Stockage des données (Base de données)** : PostgreSQL (base structurée de 24 tableaux interconnectés ou schéma relationnel).
- **Protection et accès (Sécurité)** : jetons de connexion (JWT), brouillage des mots de passe (hachage bcrypt), et blocage des requêtes illégitimes (protection CSRF).
- **Automatisation des mises à jour (DevOps / CI-CD)** : GitHub Actions pour tester et publier le site automatiquement.

---

## Liens avec la formation (Cours de référence S3/S4)

Ce portfolio intègre les connaissances acquises lors de ma 2ᵉ année de BUT :

- **R3.01** — Développement web côté navigateur (Vue.js) et côté serveur (Node.js).
- **R3.07** — Gestion et structuration rigoureuse des informations (SQL, PostgreSQL, transactions).
- **R3.09** — Sécurisation des accès et protection des données (Cryptographie, JWT, bcrypt).
- **R4.01** — Architecture logicielle et communication entre systèmes (Services web Node.js).
- **R4.03** — Stockage de données flexibles et recherche textuelle performante (Au-delà du relationnel, JSONB).
- **R4A.10** — Mémoire partagée de l'application et interface avancée (Compléments Vue.js, Pinia).

---

## Identité visuelle

Le portfolio intègre une **identité judo** :
- **Liseré ceinture** (blanc → jaune → vert → bleu → noir) visible sous l'entête
- **Jauges d'auto-évaluation = progression des grades** (avant/après)
- **Fond tatami** discret (motif de grille 96px)

---


## Contact

**Mehdi LAFAY**  
mehdi.lafay@edu.univ-fcomte.fr  
BUT Informatique — IUT Belfort-Montbéliard  
USPV Judo : https://uspv-judo.fr

---

**Portfolio de stage BUT2 | Développé avec HTML + CSS + JavaScript vanilla | 2026**
