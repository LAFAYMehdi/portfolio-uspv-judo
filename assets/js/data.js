/* =========================================================================
   Contenu du portfolio — Stage BUT 2
   Sujet : site web du club USPV Judo (Pont-de-Roide-Vermondans)
   Stage du 7 avril au 5 juin 2026.
   --------------------------------------------------------------------------
    IDENTITÉ À PERSONNALISER : remplacez firstName / lastName / email
       ci-dessous par les vôtres (et, si besoin, le nom du tuteur dans la
       section « entreprise » de la page d'accueil).
   --------------------------------------------------------------------------
   Balisage dans les textes :
     [[id]]            -> mention colorée d'un savoir-faire (son libellé)
     [[id|mon texte]]  -> colore "mon texte" avec la couleur du savoir-faire
     ((N))             -> renvoi vers le point remarquable n°N de la trace
   ========================================================================= */

window.PORTFOLIO = {

  /* ---------------------------------------------------------------- ENTÊTE */
  identity: {
    firstName: "Mehdi",
    lastName: "LAFAY",
    formation: "BUT Informatique — 2ᵉ année",
    email: "mehdi.lafay@edu.univ-fcomte.fr",
    site: "uspv-judo.fr",
    siteUrl: "https://uspv-judo.fr"
  },

  /* ----------------------------------------------------- NAVIGATION (pages) */
  nav: [
    { id: "accueil",     label: "Accueil",         num: "1" },
    { id: "technique",   label: "Technique",       num: "2" },
    { id: "suivi",       label: "Suivi de projet", num: "3" },
    { id: "integration", label: "Intégration",     num: "4" }
  ],

  /* =======================================================================
     PAGE 1 — ACCUEIL
     ===================================================================== */
  accueil: {
    kicker: "Portfolio de stage · BUT 2",
    title: "Bienvenue sur mon portfolio",
    intro:
      `<div style="float: right; margin: 0 0 15px 20px; width: 200px; text-align: center;">
         <img src="assets/img/photo-enfant.jpg" alt="Moi en judoka, il y a très longtemps" style="width: 100%; border-radius: 6px; border: 1px solid var(--line);" />
         <p style="font-size: 11px; color: var(--faint); font-style: italic; margin-top: 6px; line-height: 1.3;">Une photo venant d'une époque lointaine, très lointaine...</p>
       </div>
       Ce site présente les <strong>savoir-faire</strong> que j'ai mobilisés et développés
       pendant mon <strong>stage de 2ᵉ année de BUT Informatique</strong>, réalisé du
       <strong>7 avril au 5 juin 2026</strong> pour le club <strong>USPV Judo</strong>
       (Pont-de-Roide-Vermondans). Il s'organise en trois volets —
       <em>technique</em>, <em>suivi de projet</em> et <em>intégration en entreprise</em> —
       chacun illustré par des <strong>traces concrètes</strong> issues du projet et
       complété par un <strong>bilan</strong> qui analyse mon niveau d'expertise.`,

    archTitle: "L'architecture de la plateforme réalisée",

    entreprise: {
      title: "Le club & les personnes",
      html:
        `<p><strong>USPV Judo</strong> est le <strong>club historique de judo</strong> de
         Pont-de-Roide-Vermondans (Doubs), une <strong>association loi 1901</strong> animée par des
         bénévoles et affiliée à la <strong>Fédération Française de Judo (FFJDA)</strong>. Les cours
         ont lieu au dojo Georges Mairot.</p>
         <p class="muted" style="margin-bottom:4px"><strong>Personnes impliquées :</strong></p>
         <ul class="clean">
           <li><strong>Mon tuteur</strong> (membre du bureau) : il exprimait les besoins, fixait les
               priorités et validait chaque avancée lors des réunions de suivi.</li>
           <li>Le <strong>bureau du club</strong> (bénévoles non informaticiens) — les
               <em>utilisateurs finaux</em> de l'espace de gestion.</li>
           <li>Les <strong>familles adhérentes</strong> — le public du site et de la pré-inscription.</li>
           <li><strong>Moi</strong> — stagiaire développeur, en charge de la conception et de la
               réalisation complète de la plateforme.</li>
         </ul>
         <p style="margin-top:8px"><strong>Moyens de travail :</strong> poste de développement,
         dépôt <strong>Git/GitHub</strong> avec <strong>intégration continue</strong>, base
         <strong>PostgreSQL</strong>, serveur <strong>VPS</strong> (Nginx + PM2), et un
         <strong>cahier des charges</strong> + <strong>dossier d'architecture technique</strong>
         rédigés en amont.</p>`
    },

    sujet: {
      title: "Le contexte & le sujet",
      html:
        `<p><strong>Le point de départ :</strong> le club disposait d'un
         <strong>ancien site statique obsolète</strong>, impossible à mettre à jour par les bénévoles.
         Les <strong>inscriptions se faisaient sur papier</strong>, il n'existait ni espace adhérent,
         ni outil pour communiquer horaires, événements et tarifs.</p>
         <p><strong>Le sujet :</strong> concevoir et développer entièrement une nouvelle plateforme web
         pour le club — un <em>site public</em>, un <em>espace famille</em> et un
         <em>back-office d'administration</em> — avec la <strong>pré-inscription en ligne</strong>
         comme fonctionnalité centrale.</p>
         <p><strong>Enjeux & objectifs :</strong> <strong>dématérialiser les inscriptions</strong> dans
         le respect du <strong>RGPD</strong> (mineurs, droit à l'image) ; <strong>autonomiser le bureau</strong>
         bénévole pour qu'il gère le contenu sans technicien ; <strong>suivre les adhérents</strong>
         (dossiers, ceintures) ; le tout <strong>sécurisé</strong>, maintenable et déployé en production.</p>`
    },

    savoirFaire: {
      title: "Les savoir-faire généraux mis en jeu",
      intro:
        `Le sujet a mobilisé des savoir-faire dans plusieurs domaines. Ceux ci-dessous sont
         <strong>détaillés et analysés</strong> dans les trois pages suivantes (cliquez pour y accéder) :`,
      groups: [
        {
          page: "technique", pageLabel: "Technique",
          items: [
            { label: "Concevoir et exploiter une base de données relationnelle", color: "#2196c9", target: "technique/bilan" },
            { label: "Développer un back-end web sécurisé",                       color: "#1ea672", target: "technique/bilan" },
            { label: "Développer une interface web dynamique",                    color: "#8a63e8", target: "technique/bilan" }
          ]
        },
        {
          page: "suivi", pageLabel: "Suivi de projet",
          items: [
            { label: "Piloter un projet de développement, du besoin à la livraison", color: "#e0871a", target: "suivi/bilan" }
          ]
        },
        {
          page: "integration", pageLabel: "Intégration",
          items: [
            { label: "S'intégrer et accompagner les utilisateurs en entreprise", color: "#d9576f", target: "integration/bilan" }
          ]
        }
      ]
    }
  },

  /* =======================================================================
     PAGE 2 — TECHNIQUE  (3 savoir-faire généraux × 2 traces)
     ===================================================================== */
  technique: {
    kicker: "Volet 1 · Côté technique informatique",
    title: "Technique",
    summary:
      `Le cœur du stage : la conception et le développement de la plateforme. Six traces couvrent
       les trois grands domaines techniques — <strong>base de données</strong>, <strong>back-end sécurisé</strong>
       et <strong>front-end</strong> (deux traces chacun) — suivies d'un bilan de mes savoir-faire
       techniques généraux.`,
    subpages: [

      /* ---------- TRACE 1 : Schéma BdD ---------- */
      {
        id: "trace-1", kind: "trace", number: 1,
        tab: "BdD · Schéma",
        title: "Modéliser la base de données relationnelle",
        domain: { label: "Base de données", color: "#2196c9" },
        skills: [
          { id: "se1.1", label: "Modéliser des entités et leurs relations", color: "#2196c9" },
          { id: "se1.2", label: "Garantir l'intégrité référentielle",       color: "#1ea672" },
          { id: "se1.3", label: "Choisir les types, contraintes et index",  color: "#e0871a" }
        ],
        figure: {
          type: "svg", file: "database/schema.sql",
          caption: "Schéma relationnel (extrait) de la base PostgreSQL conçue pour la plateforme — 24 tables au total.",
          legend: [
            { n: 1, cls: "",   text: "Table grade : progression des ceintures (1 judoka → N grades)" },
            { n: 2, cls: "h2", text: "ON DELETE CASCADE : supprimer un dossier efface ses dépendances" },
            { n: 3, cls: "h3", text: "Référence polymorphique (jeton de session) sans clé étrangère" }
          ]
        },
        general:
          `<p>Cette trace est le <strong>schéma relationnel</strong> de la base que j'ai modélisée
           (<code>schema.sql</code>). Elle structure toutes les données du club : familles, dossiers
           d'inscription, pratiquants, ceintures, paiements, contenus du site et tournois.</p>
           <p>C'est la <strong>fondation du projet</strong> : avant tout développement, j'ai dû traduire
           le fonctionnement du club en entités. Le point ((1)), la table <code>grade</code>, est propre
           au judo (suivi des ceintures) ; la mécanique du point ((2)) est exploitée par la
           <strong>transaction de la trace n°2</strong>.</p>`,
        details: [
          { skillId: "se1.1",
            html: `J'ai traduit le métier du club en [[se1.1|entités et relations]] : une
                   <code>famille</code> dépose un ou plusieurs <code>dossier</code>s, chacun regroupant
                   des <code>enfant</code>s (pratiquants), un <code>representant</code> légal et une
                   <code>trace_legale</code> (consentements RGPD). Au point ((1)), chaque pratiquant
                   possède un historique de <strong>grades</strong>.` },
          { skillId: "se1.2",
            html: `Chaque relation est protégée par une clé étrangère : au point ((2)),
                   [[se1.2|<code>ON DELETE CASCADE</code>]] supprime automatiquement enfants, paiements et
                   documents d'un dossier effacé, tandis que <code>ON DELETE SET NULL</code> <em>conserve</em>
                   un dossier même si le compte famille disparaît.` },
          { skillId: "se1.3",
            html: `J'ai [[se1.3|choisi des types et des contraintes adaptés]] (<code>NUMERIC(10,2)</code>
                   pour les montants, <code>UNIQUE</code> sur les e-mails, <code>JSONB</code> pour le détail
                   du droit à l'image) et ajouté <strong>plus de 30 index</strong>, dont des index composites
                   <code>(user_id, role)</code>. Le point ((3)) montre un choix assumé : <code>refresh_token</code>
                   pointe vers <em>deux</em> tables possibles, donc <strong>sans</strong> clé étrangère, ce que
                   j'ai documenté en commentaire.` }
        ]
      },

      /* ---------- TRACE 2 : Transaction d'inscription ---------- */
      {
        id: "trace-2", kind: "trace", number: 2,
        tab: "BdD · Transaction",
        title: "Garantir l'intégrité des données via une transaction SQL",
        domain: { label: "Base de données · Transactions", color: "#2196c9" },
        skills: [
          { id: "se2.1", label: "Garantir l'atomicité par une transaction", color: "#2196c9" },
          { id: "se2.2", label: "Gérer les accès concurrents",              color: "#e0533f" },
          { id: "se2.3", label: "Insérer des données liées et tracées",     color: "#1ea672" }
        ],
        figure: {
          type: "code", lang: "js", file: "server/api/inscription.post.ts",
          caption: "Pré-inscription d'une famille : une transaction écrit atomiquement dans 5 tables liées.",
          legend: [
            { n: 1, cls: "",   text: "Transaction atomique : tout réussit, ou tout est annulé" },
            { n: 2, cls: "h2", text: "Anti-concurrence : ON CONFLICT DO NOTHING" },
            { n: 3, cls: "h3", text: "Données liées : un dossier → N pratiquants (boucle)" },
            { n: 4, cls: "h4", text: "Consentements RGPD horodatés et versionnés" }
          ],
          lines: [
            ["// inscription.post.ts — pré-inscription d'une famille (extrait)", 0],
            ["const { praticants, representant, consentements } = validateInscriptionPayload(body)", 0],
            ["await verifyTurnstile(body?.captchaToken)        // anti-bot (captcha)", 0],
            ["", 0],
            ["await withTransaction(async (client) => {        // tout ou rien", 1],
            ["  // ON CONFLICT évite la collision si deux envois arrivent en même temps", 0],
            ["  const ins = await client.query(", 2],
            ["    `INSERT INTO famille (email, nom, prenom, telephone, adresse, actif)", 2],
            ["     VALUES ($1, $2, $3, $4, $5, false)", 2],
            ["     ON CONFLICT (email) DO NOTHING RETURNING id`,", 2],
            ["    [email, representant.nom, representant.prenom, tel, adresse])", 2],
            ["  const familleId = ins.rows[0]?.id ?? (await refetchId(client, email))", 0],
            ["", 0],
            ["  const d = await client.query(`INSERT INTO dossier (famille_id, statut)", 0],
            ["    VALUES ($1, 'en_attente') RETURNING id`, [familleId])", 0],
            ["  const dossierId = d.rows[0].id", 0],
            ["", 0],
            ["  for (const p of praticants) {                  // un dossier → plusieurs judokas", 3],
            ["    await client.query(`INSERT INTO enfant", 3],
            ["      (dossier_id, nom, prenom, date_naissance, categorie, discipline)", 3],
            ["      VALUES ($1, $2, $3, $4, $5, $6)`, [dossierId, p.nom, p.prenom,", 3],
            ["      p.date_naissance, p.categorie, p.discipline])", 3],
            ["  }", 3],
            ["", 0],
            ["  await client.query(`INSERT INTO trace_legale (dossier_id,", 4],
            ["    consentement_donnees, droit_image, droit_image_details,", 4],
            ["    acceptation_reglement, version_reglement) VALUES ($1,$2,$3,$4,$5,$6)`,", 4],
            ["    [dossierId, c.donnees, c.image, JSON.stringify(details), c.reglement, version])", 4],
            ["})                                                // COMMIT implicite", 1]
          ]
        },
        general:
          `<p>La <strong>trace n°2</strong> est l'endpoint qui enregistre une pré-inscription
           (<code>inscription.post.ts</code>). Une seule soumission doit écrire dans <strong>cinq tables
           liées</strong> (<code>famille</code>, <code>dossier</code>, <code>enfant</code>,
           <code>representant</code>, <code>trace_legale</code>) — sans jamais laisser un dossier à moitié créé.</p>
           <p>Elle met « en vie » le modèle de la <strong>trace n°1</strong> : c'est ici que les relations et
           les clés étrangères prennent tout leur sens, sur la fonctionnalité la plus sensible du projet.</p>`,
        details: [
          { skillId: "se2.1",
            html: `Au point ((1)), tout passe par une [[se2.1|transaction]] (<code>withTransaction</code>) :
                   si une seule insertion échoue, <strong>toutes</strong> sont annulées (rollback). Impossible
                   d'obtenir une famille sans dossier ou un dossier sans représentant.` },
          { skillId: "se2.2",
            html: `Au point ((2)), je [[se2.2|gère les accès concurrents]] : si deux parents valident le
                   formulaire au même instant, <code>ON CONFLICT (email) DO NOTHING</code> empêche la
                   violation de contrainte <code>UNIQUE</code> ; je relis alors la ligne existante.` },
          { skillId: "se2.3",
            html: `Aux points ((3)) et ((4)), j'[[se2.3|insère les données liées]] : une boucle crée un
                   <code>enfant</code> par judoka, puis j'enregistre la <strong>trace légale</strong> (RGPD)
                   horodatée et versionnée. Toutes les valeurs passent par des
                   <strong>requêtes paramétrées</strong> (<code>$1, $2…</code>), donc aucune injection SQL.` }
        ]
      },

      /* ---------- TRACE 3 : Authentification ---------- */
      {
        id: "trace-3", kind: "trace", number: 3,
        tab: "Back-end · Auth",
        title: "Sécuriser la connexion à l'espace de gestion (bcrypt, JWT)",
        domain: { label: "Back-end · Sécurité", color: "#1ea672" },
        skills: [
          { id: "se3.1", label: "Hacher les mots de passe (bcrypt)",            color: "#1ea672" },
          { id: "se3.2", label: "Gérer des sessions par jetons (JWT + refresh)", color: "#2196c9" },
          { id: "se3.3", label: "Protéger le cookie (HttpOnly)",                color: "#8a63e8" },
          { id: "se3.4", label: "Sécuriser la configuration (fail-fast)",       color: "#e0533f" }
        ],
        figure: {
          type: "code", lang: "js", file: "server/utils/auth.ts + api/auth/login.post.ts",
          caption: "Connexion d'un membre du bureau : vérification bcrypt, JWT court et cookie HttpOnly.",
          legend: [
            { n: 1, cls: "",   text: "Hachage bcrypt (coût 12) + vérification" },
            { n: 2, cls: "h2", text: "JWT court (15 min) + refresh token haché en base" },
            { n: 3, cls: "h3", text: "Cookie HttpOnly / Secure / SameSite" },
            { n: 4, cls: "h4", text: "Fail-fast : refus de démarrer sans vrai secret" }
          ],
          lines: [
            ["// auth.ts — le mot de passe n'est jamais stocké en clair", 0],
            ["export const hashPassword = (p) => bcrypt.hash(p, 12)   // coût 12 (préco. DAT)", 1],
            ["", 0],
            ["// En production, on refuse de démarrer avec un secret par défaut", 0],
            ["if (NODE_ENV === 'production' && JWT_SECRET.includes('fallback'))", 4],
            ["  throw new Error('JWT_SECRET manquant en production')", 4],
            ["", 0],
            ["// login.post.ts — vérification de l'identité", 0],
            ["const u = (await query('SELECT id, role, mot_de_passe, actif", 0],
            ["           FROM utilisateur WHERE email = $1', [email])).rows[0]", 0],
            ["if (!u || !u.actif) throw createError({ statusCode: 401 })", 0],
            ["if (!(await bcrypt.compare(motDePasse, u.mot_de_passe)))   // comparaison bcrypt", 1],
            ["  throw createError({ statusCode: 401, statusMessage: 'Identifiants incorrects.' })", 1],
            ["", 0],
            ["const token   = jwt.sign({ id: u.id, role: u.role }, JWT_SECRET, { expiresIn: '15m' })", 2],
            ["const refresh = crypto.randomBytes(40).toString('hex')     // session longue", 2],
            ["await query('DELETE FROM refresh_token WHERE user_id=$1 AND role=$2', [u.id, u.role])", 2],
            ["await query(`INSERT INTO refresh_token (user_id, role, token_hash, expires_at)", 2],
            ["  VALUES ($1,$2,$3, NOW() + INTERVAL '7 days')`, [u.id, u.role, sha256(refresh)])", 2],
            ["", 0],
            ["setCookie(event, 'uspv_admin_token', token,", 3],
            ["  { httpOnly: true, secure: true, sameSite: 'strict' })   // inaccessible au JS", 3]
          ]
        },
        general:
          `<p>La <strong>trace n°3</strong> est la <strong>connexion</strong> à l'espace de gestion
           (<code>auth.ts</code> + <code>login.post.ts</code>). Tout le back-office du bureau repose sur elle :
           c'est l'authentification qui conditionne le système de <strong>rôles</strong> et l'accès aux données
           des adhérents.</p>
           <p>La sécurité des <strong>données personnelles de mineurs</strong> était un enjeu fort : une fuite
           serait inacceptable pour le club.</p>`,
        details: [
          { skillId: "se3.1",
            html: `Au point ((1)), je [[se3.1|hache le mot de passe avec bcrypt]] (un algorithme de brouillage) (coût 12) : il n'est
                   <strong>jamais stocké en clair</strong>, et la comparaison se fait par
                   <code>bcrypt.compare</code> — résistant aux attaques par dictionnaire.` },
          { skillId: "se3.2",
            html: `Au point ((2)), je [[se3.2|gère la session par jetons]] : un <strong>JWT (jeton de sécurité) de 15 min</strong>
                   pour les requêtes, et un <strong>refresh token</strong> de 7 jours <em>haché en base</em>
                   (jamais en clair). Je révoque l'ancienne session avant d'en créer une nouvelle.` },
          { skillId: "se3.3",
            html: `Au point ((3)), le jeton part dans un [[se3.3|cookie <code>HttpOnly</code>]] (+ <code>Secure</code>,
                   <code>SameSite=strict</code>) : inaccessible au JavaScript, il résiste au vol par XSS.` },
          { skillId: "se3.4",
            html: `Au point ((4)), j'applique le principe [[se3.4|<em>fail-fast</em>]] : en production, le serveur
                   <strong>refuse de démarrer</strong> si le secret JWT est resté la valeur par défaut — une
                   erreur de déploiement impossible à ignorer.` }
        ]
      },

      /* ---------- TRACE 4 : Défense en profondeur ---------- */
      {
        id: "trace-4", kind: "trace", number: 4,
        tab: "Back-end · Défense",
        title: "Filtrer les requêtes API via une chaîne de middlewares",
        domain: { label: "Sécurité · Système", color: "#e0533f" },
        skills: [
          { id: "se4.1", label: "Limiter le débit des requêtes (rate-limit)", color: "#e0533f" },
          { id: "se4.2", label: "Prévenir les attaques CSRF",                 color: "#e0871a" },
          { id: "se4.3", label: "Durcir les en-têtes HTTP",                   color: "#8a63e8" },
          { id: "se4.4", label: "Empiler les middlewares (chaîne)",           color: "#1ea672" }
        ],
        figure: {
          type: "code", lang: "js", file: "server/middleware/ (01-rate-limit, 02-csrf, 00-headers)",
          caption: "Chaîne de middlewares : chaque requête API traverse plusieurs contrôles avant le code métier.",
          legend: [
            { n: 1, cls: "",   text: "Quotas par type de route → 429 si dépassement" },
            { n: 2, cls: "h2", text: "Compteur par adresse IP (fenêtre glissante)" },
            { n: 3, cls: "h3", text: "Jeton anti-CSRF sur les écritures authentifiées → 403" },
            { n: 4, cls: "h4", text: "En-têtes de sécurité (HSTS, nosniff, CSP)" }
          ],
          lines: [
            ["// 01-rate-limit.ts — un quota différent selon la sensibilité de la route", 0],
            ["const rules = [", 0],
            ["  { name:'login',  match:p=>p==='/api/auth/login',       windowMs:600000, max:10  },", 1],
            ["  { name:'admin',  match:p=>p.startsWith('/api/admin'),  windowMs:60000,  max:120 },", 1],
            ["  { name:'public', match:p=>p.startsWith('/api/public'), windowMs:60000,  max:240 },", 1],
            ["]", 0],
            ["const rule = rules.find(r => r.match(path)); if (!rule) return", 0],
            ["const key   = `${rule.name}:${getClientIp(event, trustProxy)}`  // par IP", 2],
            ["const entry = bump(buckets, key, rule.windowMs)", 2],
            ["if (entry.count > rule.max)", 1],
            ["  throw createError({ statusCode: 429, statusMessage: 'Trop de requêtes.' })", 1],
            ["", 0],
            ["// 02-csrf.ts — sur les écritures d'un utilisateur connecté", 0],
            ["if (!SAFE_METHODS.has(method) && getAuthUser(event)) {", 3],
            ["  const token = getHeader(event, 'x-csrf-token') || ''", 3],
            ["  if (!await validateCsrfToken(user, token))", 3],
            ["    throw createError({ statusCode: 403, statusMessage: 'CSRF invalide.' })", 3],
            ["}", 3],
            ["", 0],
            ["// 00-security-headers.ts — posés sur toutes les réponses", 0],
            ["setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains')", 4],
            ["setHeader(event, 'X-Content-Type-Options', 'nosniff')", 4]
          ]
        },
        general:
          `<p>La <strong>trace n°4</strong> est la <strong>chaîne de middlewares</strong> (des filtres intermédiaires) du serveur. Avant
           d'atteindre le code métier, chaque requête API traverse plusieurs <strong>barrières</strong>
           numérotées (<code>00-</code> à <code>05-</code>) : en-têtes de sécurité, limite de débit, vérification
           CSRF…</p>
           <p>C'est l'application du principe de <strong>défense en profondeur</strong> : si une protection est
           contournée, les autres tiennent encore. Indispensable pour un site exposé sur Internet.</p>`,
        details: [
          { skillId: "se4.1",
            html: `Aux points ((1)) et ((2)), je [[se4.1|limite le débit]] : la connexion est plafonnée à
                   <strong>10 tentatives / 10 min par IP</strong> (anti-force brute), l'admin et le public ont
                   leurs propres quotas. Au-delà, le serveur répond <code>429</code>.` },
          { skillId: "se4.2",
            html: `Au point ((3)), je [[se4.2|préviens les attaques CSRF]] : toute écriture authentifiée doit
                   présenter un <strong>jeton anti-CSRF</strong> valide, sinon <code>403</code>. Un site malveillant
                   ne peut donc pas agir au nom d'un membre connecté.` },
          { skillId: "se4.3",
            html: `Au point ((4)), je [[se4.3|durcis les en-têtes HTTP]] : <code>HSTS</code> (force le HTTPS),
                   <code>nosniff</code> et une <code>CSP</code> limitent les vecteurs d'attaque côté navigateur.` },
          { skillId: "se4.4",
            html: `Le tout forme une [[se4.4|chaîne de middlewares]] ordonnée : chaque requête les traverse dans
                   l'ordre, une responsabilité par fichier — simple à lire, à tester et à maintenir.` }
        ]
      },

      /* ---------- TRACE 5 : Garde de navigation (Nuxt) ---------- */
      {
        id: "trace-5", kind: "trace", number: 5,
        tab: "Front-end · Routage",
        title: "Restreindre l'accès aux pages d'administration d'une SPA",
        domain: { label: "Front-end · Nuxt 3", color: "#8a63e8" },
        skills: [
          { id: "se5.1", label: "Structurer une app en pages (Nuxt 3)",   color: "#8a63e8" },
          { id: "se5.2", label: "Router côté client",                     color: "#2196c9" },
          { id: "se5.3", label: "Protéger les routes (garde de navigation)", color: "#1ea672" }
        ],
        figure: {
          type: "code", lang: "js", file: "admin/middleware/auth.global.ts",
          caption: "Garde de navigation globale : exécutée avant chaque page de l'application d'administration.",
          legend: [
            { n: 1, cls: "",   text: "La page de connexion reste publique" },
            { n: 2, cls: "h2", text: "Vérification de l'identité via le cookie (/api/auth/me)" },
            { n: 3, cls: "h3", text: "Rôle insuffisant ou erreur → redirection vers /login" }
          ],
          lines: [
            ["// auth.global.ts — garde exécutée AVANT chaque changement de page", 0],
            ["export default defineNuxtRouteMiddleware(async (to) => {", 0],
            ["  if (to.path === '/login') return                 // page publique", 1],
            ["", 0],
            ["  const { apiFetch } = useAdminApi()", 0],
            ["  try {", 0],
            ["    const res = await apiFetch('/api/auth/me')      // qui suis-je ? (cookie)", 2],
            ["    const role = res?.data?.role", 2],
            ["    if (role !== 'admin') {", 3],
            ["      return navigateTo('/login')                   // pas le bon rôle", 3],
            ["    }", 3],
            ["  } catch {", 0],
            ["    return navigateTo('/login')                     // non connecté", 3],
            ["  }", 0],
            ["})", 0]
          ]
        },
        general:
          `<p>La <strong>trace n°5</strong> est la <strong>garde de navigation</strong> de l'application
           d'administration. Le site est construit comme une <strong>SPA (application à page unique)</strong> avec <strong>Nuxt 3</strong> (Vue 3) : les pages sont des
           composants, et la navigation se fait <strong>côté client</strong>, sans rechargement complet.</p>
           <p>Sans elle, n'importe qui pourrait tenter d'ouvrir une page de gestion en tapant son URL : c'est la
           porte d'entrée de tout l'espace bureau.</p>`,
        details: [
          { skillId: "se5.1",
            html: `L'application est [[se5.1|structurée en pages]] (routage par fichiers de Nuxt) : une page par
                   écran de gestion (dossiers, horaires, photos, boutique…), claire et maintenable.` },
          { skillId: "se5.2",
            html: `La navigation est [[se5.2|gérée côté client]] : changer de page n'entraîne pas un rechargement
                   complet, mais déclenche d'abord cette garde.` },
          { skillId: "se5.3",
            html: `Au point ((2)), la [[se5.3|garde protège les routes]] : elle interroge <code>/api/auth/me</code>
                   (le cookie HttpOnly de la <strong>trace n°3</strong>) ; si le rôle n'est pas
                   <code>admin</code> (point ((3))) ou en cas d'erreur, elle <strong>redirige vers la connexion</strong>.
                   La sécurité réelle reste côté serveur — cette garde améliore surtout l'expérience.` }
        ]
      },

      /* ---------- TRACE 6 : Formulaire réactif ---------- */
      {
        id: "trace-6", kind: "trace", number: 6,
        tab: "Front-end · Réactivité",
        title: "Développer un formulaire de pré-inscription multi-étapes réactif",
        domain: { label: "Front-end · Vue 3", color: "#8a63e8" },
        skills: [
          { id: "se6.1", label: "Dériver l'état automatiquement (watch)",   color: "#8a63e8" },
          { id: "se6.2", label: "Valider de façon réactive (computed + Zod)", color: "#e0871a" },
          { id: "se6.3", label: "Persister l'état (localStorage)",          color: "#2196c9" }
        ],
        figure: {
          type: "code", lang: "js", file: "composables/usePreInscriptionForm.ts",
          caption: "Composable Vue 3 pilotant le formulaire de pré-inscription multi-étapes (familles).",
          legend: [
            { n: 1, cls: "",   text: "État dérivé : la liste des judokas suit le nombre saisi" },
            { n: 2, cls: "h2", text: "Validation réactive par étape (Zod + computed)" },
            { n: 3, cls: "h3", text: "Le brouillon survit à un rafraîchissement de page" }
          ],
          lines: [
            ["// usePreInscriptionForm.ts — formulaire réactif (Composition API)", 0],
            ["const form = ref(defaultForm())", 0],
            ["const step = ref(1)", 0],
            ["", 0],
            ["// La liste des judokas se construit toute seule selon le nombre saisi", 0],
            ["watch(() => form.value.nombre_enfants_pratiquants, (n) => {", 1],
            ["  const cur = form.value.enfants.length", 1],
            ["  if (n > cur) for (let i = cur; i < n; i++) form.value.enfants.push(defaultEnfant())", 1],
            ["  else        form.value.enfants = form.value.enfants.slice(0, n)", 1],
            ["})", 1],
            ["", 0],
            ["// Validation déclarative par étape (schémas Zod)", 0],
            ["const representantSchema = z.object({", 2],
            ["  email:     z.string().email('Email invalide'),", 2],
            ["  telephone: z.string().min(1, 'Le téléphone est requis'),", 2],
            ["})", 2],
            ["const canProceed = computed(() =>                  // recalculé automatiquement", 2],
            ["  Object.keys(validationErrors.value).length === 0)", 2],
            ["", 0],
            ["// Le brouillon est sauvegardé à chaque frappe → repris après un refresh", 0],
            ["watch(form, (snap) =>", 3],
            ["  localStorage.setItem(STORAGE_KEY, JSON.stringify(snap)), { deep: true })", 3]
          ]
        },
        general:
          `<p>La <strong>trace n°6</strong> est le <strong>composable</strong> qui pilote le formulaire de
           <strong>pré-inscription</strong> (<code>usePreInscriptionForm.ts</code>) : un parcours en plusieurs
           étapes, utilisable par des parents pressés, sur mobile.</p>
           <p>C'est le pendant <em>front</em> de la <strong>trace n°2</strong> : ici je <strong>recueille et valide</strong>
           les données ; là-bas, l'API les <strong>enregistre</strong>. Une donnée propre en amont, c'est moins
           d'erreurs en base.</p>`,
        details: [
          { skillId: "se6.1",
            html: `Au point ((1)), j'[[se6.1|exploite la réactivité de Vue]] : un <code>watch</code> ajuste tout
                   seul la liste des judokas quand le parent change leur nombre — aucun code manuel d'ajout/retrait
                   de champs.` },
          { skillId: "se6.2",
            html: `Au point ((2)), la [[se6.2|validation est réactive]] : des schémas <strong>Zod</strong> par étape
                   alimentent un <code>computed</code> <code>canProceed</code> recalculé à chaque frappe, qui active
                   ou bloque le bouton « Suivant ».` },
          { skillId: "se6.3",
            html: `Au point ((3)), je [[se6.3|persiste l'état]] dans <code>localStorage</code> : si la page est
                   fermée ou rechargée par erreur, le <strong>brouillon est restauré</strong> — un vrai confort pour
                   un long formulaire familial.` }
        ]
      },

      /* ---------- BILAN TECHNIQUE ---------- */
      {
        id: "bilan", kind: "bilan",
        tab: "Bilan & analyse",
        title: "Bilan — savoir-faire techniques",
        intro:
          `J'évalue ici mes trois savoir-faire techniques généraux, en variant les domaines
           (<strong>base de données</strong>, <strong>back-end & sécurité</strong>,
           <strong>front-end</strong>). Chaque savoir-faire est illustré par <strong>deux traces</strong> ;
           chaque bloc précise le contexte d'apprentissage et situe mon niveau <em>avant / après</em> le stage.`,
        scale: ["Débutant", "Notions", "Moyen", "Bon", "Avancé"],
        blocks: [
          {
            color: "#2196c9", domain: "Base de données (PostgreSQL)",
            title: "Concevoir et exploiter une base de données relationnelle",
            recap: [
              { k: "Modélisation & intégrité", t: "schéma, CASCADE / SET NULL (trace 1) — R3.07.", tags: ["cours", "stage"] },
              { k: "JSONB & index avancés", t: "JSONB consentements, 30+ index (trace 1) — R4.03.", tags: ["cours", "stage"] },
              { k: "Transactions & concurrence", t: "withTransaction, ON CONFLICT (trace 2).", tags: ["stage", "diff"] },
              { k: "Requêtes filtrées & paginées", t: "jointures, ILIKE paramétré, pagination (API dossiers).", tags: ["stage"] }
            ],
            before: 2, after: 4,
            justif:
              `En <strong>R3.07</strong> (SQL en langage de programmation) et <strong>R4.03</strong> (Au-delà du
               relationnel — JSONB, full-text search), j'avais acquis les bases de PostgreSQL avec Node.js. Le stage
               m'a fait concevoir un <strong>schéma réel complet</strong> (24 tables) puis écrire des
               <strong>transactions atomiques</strong>, des <strong>requêtes filtrées et paginées</strong> bien plus
               poussées — progression nette de « Moyen » vers « Avancé ».`
          },
          {
            color: "#1ea672", domain: "Développement · Sécurité",
            title: "Développer un back-end web sécurisé",
            recap: [
              { k: "Authentification", t: "bcrypt, JWT + refresh, HttpOnly (trace 3) — base vue en R3.09.", tags: ["cours", "stage", "diff"] },
              { k: "API REST & middleware", t: "routes Nitro, handlers (trace 4) — R3.01 serveur, R4.01.", tags: ["cours", "stage"] },
              { k: "Défense en profondeur", t: "rate-limit, CSRF, en-têtes (trace 4).", tags: ["stage", "perso", "diff"] },
              { k: "Déploiement", t: "VPS, Nginx, PM2, TLS Let's Encrypt.", tags: ["perso", "diff"] }
            ],
            before: 1, after: 3,
            justif:
              `En <strong>R3.01 côté serveur</strong> et <strong>R4.01</strong> (Services web Node.js), j'avais
               construit des APIs REST basiques. En <strong>R3.09</strong> (Cryptographie), j'avais vu le hash et
               les bases de JWT. Mais concevoir l'<strong>authentification complète</strong> (bcrypt coût 12, refresh
               haché en base, cookie HttpOnly) et la <strong>sécurité en profondeur</strong> (rate-limit, CSRF, HSTS)
               sur un projet en production a été apprend en autonomie : ma plus grosse progression, que je situe
               honnêtement à « Bon » (pas encore « Avancé »).`
          },
          {
            color: "#8a63e8", domain: "Développement front-end (Nuxt 3)",
            title: "Développer une interface web dynamique",
            recap: [
              { k: "SPA & routage", t: "pages Nuxt, middleware (trace 5) — R3.01 client, SAÉ S3.", tags: ["cours", "stage"] },
              { k: "Réactivité Vue 3", t: "ref / computed / watch (trace 6) — R3.01 client, R4A.10.", tags: ["cours", "stage"] },
              { k: "JWT côté front", t: "intercepteur Axios, refresh automatique (trace 5) — R4A.10.", tags: ["cours", "stage"] },
              { k: "Validation & UX", t: "Zod, formulaire multi-étapes, localStorage (trace 6).", tags: ["stage"] }
            ],
            before: 2, after: 4,
            justif:
              `En <strong>R3.01 côté client</strong> et la SAÉ S3, j'avais découvert Vue.js (Pinia, vue-router,
               composants). En <strong>R4A.10</strong> (Compléments Web), j'ai approfondi : JWT côté front, Pinia
               avancé, vue-router poussé. Passer de ces exercices à une <strong>SPA Nuxt 3 complète</strong> (gardes
               de navigation, composables, formulaires multi-étapes validés par Zod) sur un projet réel m'a fait
               franchir le cap de « Moyen » à « Avancé ».`
          }
        ]
      }
    ]
  },

  /* =======================================================================
     PAGE 3 — SUIVI DE PROJET  (1 savoir-faire général × 2 traces)
     ===================================================================== */
  suivi: {
    kicker: "Volet 2 · Suivi de projet",
    title: "Suivi de projet",
    summary:
      `Au-delà du code, le stage a été un <strong>vrai projet</strong> à mener dans la durée pour un client réel.
       Trois traces montrent comment j'ai <strong>analysé les besoins</strong> du club, <strong>tenu un journal de
       bord</strong> et <strong>organisé et suivi</strong> mon travail, avant le bilan.`,
    subpages: [

      /* ---------- TRACE 7 : Besoins → fonctionnalités ---------- */
      {
        id: "trace-7", kind: "trace", number: 7,
        tab: "Analyse des besoins",
        title: "Traduire le besoin brut du club en fonctionnalités techniques",
        domain: { label: "Gestion de projet", color: "#e0871a" },
        skills: [
          { id: "se7.1", label: "Recueillir et cadrer les besoins (CDC)",   color: "#d9576f" },
          { id: "se7.2", label: "Traduire un besoin en fonctionnalités",    color: "#8a63e8" },
          { id: "se7.3", label: "Prioriser et découper en sprints",         color: "#e0871a" }
        ],
        figure: {
          type: "needs", file: "Cahier des charges → fonctionnalités (synthèse)",
          caption: "Correspondance entre les besoins exprimés par le club et les fonctionnalités livrées.",
          legend: [
            { n: 1, cls: "",   text: "Un besoin → plusieurs fonctionnalités" },
            { n: 2, cls: "h2", text: "Besoin métier traduit en données" },
            { n: 3, cls: "h3", text: "Contrainte légale → solution dédiée" }
          ],
          rows: [
            { need: "« On veut arrêter les inscriptions papier »", feat: "Pré-inscription en ligne multi-pratiquants + suivi des dossiers", hot: 1 },
            { need: "« Le bureau doit gérer le site sans nous appeler »", feat: "Back-office complet (horaires, événements, photos, boutique, tarifs)", hot: 1 },
            { need: "« Suivre la ceinture de chaque judoka »", feat: "Grades par pratiquant (ceinture, date, saison)", hot: 2 },
            { need: "« Respecter le RGPD (mineurs, droit à l'image) »", feat: "Consentements versionnés & horodatés (table trace_legale)", hot: 3 },
            { need: "« Les parents envoient des photos iPhone illisibles »", feat: "Conversion automatique HEIC → JPEG à l'envoi", hot: 0 },
            { need: "« Communiquer nos événements et nos tarifs »", feat: "Pages publiques + carrousel d'actualités éditable", hot: 0 }
          ]
        },
        general:
          `<p>La <strong>trace n°7</strong> synthétise mon travail d'<strong>analyse des besoins</strong> :
           à gauche, ce que le club exprimait (en langage non technique) ; à droite, les
           <strong>fonctionnalités</strong> que j'en ai déduites et développées.</p>
           <p>Contrairement à un sujet « clé en main », il a d'abord fallu <strong>comprendre</strong> le
           fonctionnement du club et le formaliser dans un <strong>cahier des charges</strong> avant de coder.</p>`,
        details: [
          { skillId: "se7.1",
            html: `J'ai [[se7.1|recueilli et cadré les besoins]] lors de réunions régulières avec mon tuteur,
                   puis je les ai formalisés dans un <strong>cahier des charges</strong> et un
                   <strong>dossier d'architecture technique</strong> validés en début de stage.` },
          { skillId: "se7.2",
            html: `J'ai [[se7.2|traduit chaque besoin]] en solution : au point ((1)), « gérer le site soi-même »
                   est devenu <em>plusieurs</em> modules ; au point ((2)), « suivre les ceintures » est devenu une
                   <strong>donnée</strong> (la table <code>grade</code> de la trace n°1).` },
          { skillId: "se7.3",
            html: `J'ai [[se7.3|priorisé et découpé en sprints]] : d'abord les fondations (base, auth, inscription),
                   puis la valeur ajoutée. Le point ((3)) montre une contrainte <strong>légale</strong> (RGPD)
                   traitée par une solution dédiée (la trace légale de la trace n°2).` }
        ]
      },

      /* ---------- TRACE 8 : Journal de bord / Kanban ---------- */
      {
        id: "trace-journal", kind: "trace", number: 8,
        tab: "Journal de bord (Kanban)",
        title: "Tenir un journal de bord et suivre l'avancement des tâches",
        domain: { label: "Gestion de projet", color: "#e0871a" },
        skills: [
          { id: "se8j.1", label: "Tenir un journal de bord (tableau Kanban)", color: "#e0871a" },
          { id: "se8j.2", label: "Suivre et prioriser les tâches",            color: "#2196c9" },
          { id: "se8j.3", label: "Planifier en sprints et faire des bilans",  color: "#1ea672" }
        ],
        figure: {
          type: "kanban", file: "Trello — USPV Judo · Suivi de projet & gestion de tâches",
          caption: "Mon tableau Kanban (Trello) à mi-projet : les tâches circulent de colonne en colonne jusqu'à la « récolte ».",
          legend: [
            { n: 1, cls: "",   text: "Le flux d'une tâche : du « Bac de départ » au sprint, puis « En cours »" },
            { n: 2, cls: "h2", text: "Chaque carte porte un coût en points Fibonacci (2, 3, 5, 7, 11…) estimé en début de sprint" },
            { n: 3, cls: "h3", text: "« Récolte Sprint » : le bilan des tâches terminées — base du BurnUp Chart" }
          ],
          columns: [
            { name: "Bac de départ", hot: 1, cards: [
              { t: "[GESTION] Étude des besoins & cahier des charges", color: "#e0871a" },
              { t: "[TECH] Audit de l'existant & plan de migration",   color: "#2196c9", cost: 3 },
              { t: "[DESIGN] Maquettes & charte graphique",            color: "#8a63e8", cost: 2 }
            ]},
            { name: "Sprint en cours", hot: 0, cards: [
              { t: "[FONCTIONNELLE] Inscription en 4 étapes", color: "#1ea672", cost: 7, hot: 2 },
              { t: "[TECH] Admin app (Nuxt) sur le port 3100", color: "#2196c9", cost: 5 },
              { t: "[FONCTIONNELLE] Espace Famille (profil, dossiers)", color: "#1ea672", cost: 7 }
            ]},
            { name: "En cours", hot: 0, cards: [
              { t: "[FONCTIONNELLE] Admin CMS (horaires, événements)", color: "#1ea672", cost: 7 },
              { t: "[DESIGN] Responsive & polish Tailwind",            color: "#8a63e8", cost: 5 }
            ]},
            { name: "Récolte Sprint 0", hot: 3, cards: [
              { t: "[TECH] Modélisation PostgreSQL MCD/MLD",           color: "#2196c9", cost: 7 },
              { t: "[TECH] Auth JWT + CSRF + rate-limit",              color: "#2196c9", cost: 11 },
              { t: "[DESIGN] Pages publiques (accueil, contact…)",     color: "#8a63e8", cost: 5 }
            ]}
          ]
        },
        general:
          `<p>La <strong>trace n°8</strong> est mon <strong>journal de bord</strong>, tenu sur un
           <strong>tableau Kanban</strong> (outil <strong>Trello</strong>). Un tableau Kanban est une suite de
           <strong>colonnes</strong> représentant les étapes d'une tâche (à faire → en cours → fait) : on y
           déplace des <strong>cartes</strong> au fil de l'avancement, ce qui donne en un coup d'œil l'état du projet.</p>
           <p>J'ai travaillé en <strong>méthode agile</strong>, c'est-à-dire par <strong>sprints</strong> — des cycles
           courts d'environ deux semaines au bout desquels on fait le point. En complément du Kanban, un
           <strong>diagramme de Gantt</strong> (planning des phases) et un
           <strong>BurnUp</strong> (courbe d'avancement)
           m'ont aidé à <strong>planifier</strong> et à mesurer la progression du début à la livraison.</p>`,
        details: [
          { skillId: "se8j.1",
            html: `J'ai [[se8j.1|tenu ce journal de bord]] dès le premier jour : chaque tâche — développement,
                   apprentissage ou organisation — devient une <strong>carte</strong>. Au point ((1)), les colonnes
                   matérialisent le <strong>flux</strong> d'une tâche, du « Bac de départ » jusqu'à sa réalisation.` },
          { skillId: "se8j.2",
            html: `Au point ((2)), chaque carte porte un <strong>label de catégorie</strong> (<em>[TECH]</em>,
                   <em>[FONCTIONNELLE]</em>, <em>[DESIGN]</em>, <em>[GESTION]</em>), ce qui m'a permis de
                   [[se8j.2|suivre et prioriser]] : voir d'un coup d'œil ce qui restait à faire et dans quel domaine.` },
          { skillId: "se8j.3",
            html: `Au point ((3)), la colonne <strong>« Récolte Sprint »</strong> est le <strong>bilan</strong> de fin de
                   sprint : j'y regroupe les tâches terminées pour faire le point avec mon tuteur. C'est ainsi que
                   j'ai [[se8j.3|planifié en sprints et fait des bilans]] réguliers, en lien avec le Gantt et le BurnUp.` }
        ]
      },

      /* ---------- TRACE 9 : Git & CI/CD ---------- */
      {
        id: "trace-8", kind: "trace", number: 9,
        tab: "Versioning & CI/CD",
        title: "Versionner le code source et automatiser le déploiement (CI/CD)",
        domain: { label: "Gestion de projet", color: "#e0871a" },
        skills: [
          { id: "se8.1", label: "Versionner (Git, commits conventionnels)", color: "#e0871a" },
          { id: "se8.2", label: "Avancer par itérations",                   color: "#2196c9" },
          { id: "se8.3", label: "Automatiser le déploiement (CI/CD)",       color: "#1ea672" }
        ],
        figures: [
          {
            type: "gitlog", file: "git log (extrait) — 208 commits",
            caption: "Extrait de l'historique Git du projet — 208 commits, du démarrage à la soutenance.",
            legend: [
              { n: 1, cls: "",   text: "Tout premier commit : départ du projet" },
              { n: 2, cls: "h2", text: "Livraison d'une fonctionnalité (commit « feat »)" }
            ],
            commits: [
              { hash: "4373c25", msg: "Doc de base", hot: 1 },
              { hash: "73f14db", msg: "feat: Add application source code", hot: 2 },
              { hash: "49443bd", msg: "feat: Add project tracking (suivi-de-projet)", hot: 0 },
              { hash: "1d2ed17", msg: "feat(seo): sitemap dynamique généré depuis la BDD", hot: 2 },
              { hash: "bf06a8a", msg: "feat(admin): mode édition, rappel mot de passe, export VCF", hot: 2 },
              { hash: "287bc32", msg: "feat: support photos HEIC (iPhone) avec conversion JPEG", hot: 2 },
              { hash: "f1f70ee", msg: "ci(seo): ping IndexNow automatique après déploiement réussi", hot: 0 },
              { hash: "672b629", msg: "fix(security): révoquer les refresh tokens au changement de mdp", hot: 0 },
              { hash: "088c67b", msg: "fix(upload): isoler la conversion HEIC dans un process enfant", hot: 0 },
              { hash: "5dd40a0", msg: "fix(seo): corriger l'anti-pattern robots.txt + noindex", hot: 0 }
            ]
          },
          {
            type: "code", lang: "yaml", file: ".github/workflows/deploy.yml (extrait)",
            caption: "Workflow GitHub Actions du projet : à chaque push sur main, le site est déployé en production de bout en bout.",
            legend: [
              { n: 3, cls: "h3", text: "Déclenché à chaque push validé sur main : build de l'app et de l'admin, migrations BDD, redémarrage des services." },
              { n: 4, cls: "h4", text: "Fiabilisation : un health-check bloque toute mise en ligne défaillante ; notification SEO (IndexNow) en fin de déploiement." }
            ],
            lines: [
              ["name: Déploiement Automatique", 0],
              ["on:", 3],
              ["  push:", 3],
              ["    branches: [main]                  # à chaque évolution validée sur main", 3],
              ["jobs:", 3],
              ["  deploy:", 3],
              ["    runs-on: ubuntu-latest", 3],
              ["    steps:", 3],
              ["      - uses: actions/checkout@v5", 3],
              ["      # Copier le build sur le serveur de prod (SCP, clé SSH en secret)", 3],
              ["      - uses: appleboy/scp-action@v0.1.7", 3],
              ["      # Connexion SSH puis reconstruction et mise en service", 3],
              ["      - uses: appleboy/ssh-action@v1.0.3", 3],
              ["        with:", 3],
              ["          script: |", 3],
              ["            npm install && npm run build        # app publique + admin", 3],
              ["            npm run migrate:up                  # migrations BDD (node-pg-migrate)", 3],
              ["            systemctl restart uspv-public uspv-admin", 3],
              ["", 0],
              ["            # Health-check : échoue le déploiement si l'API ne répond pas 200", 4],
              ["            curl -fsS http://127.0.0.1:3000/api/health?db=1", 4],
              ["      # SEO : notifier IndexNow du sitemap live (étape non bloquante)", 4],
              ["      - name: Notifier IndexNow (recrawl prioritaire)", 4],
              ["        if: success()", 4]
            ]
          }
        ],
        general:
          `<p>La <strong>trace n°9</strong> réunit deux preuves complémentaires : à gauche l'<strong>historique Git</strong>
           du projet — <strong>208 commits</strong> qui racontent la progression, du tout premier (point ((1))) jusqu'aux
           derniers correctifs avant la soutenance — et à droite le <strong>fichier de configuration</strong> qui
           <strong>automatise la mise en ligne</strong> (intégration & déploiement continus). J'ai adopté les
           <strong>commits conventionnels</strong> (<code>feat:</code>, <code>fix:</code>, <code>ci:</code>…).</p>
           <p>Versionner <em>et</em> automatiser le déploiement étaient indispensables pour un projet de cette
           ampleur : garder une trace lisible, pouvoir revenir en arrière, et <strong>fiabiliser</strong> chaque
           mise en production.</p>`,
        details: [
          { skillId: "se8.1",
            html: `J'ai [[se8.1|versionné avec Git]] de bout en bout : des commits fréquents et
                   <strong>typés</strong> (point ((2)), les <code>feat:</code>) qui forment un historique
                   immédiatement lisible.` },
          { skillId: "se8.2",
            html: `Le projet a avancé par [[se8.2|itérations]] (sprints) : une fonctionnalité à la fois — base,
                   authentification, inscription, back-office, boutique, tournoi… — chacune testée puis validée
                   avec le tuteur.` },
          { skillId: "se8.3",
            html: `J'ai [[se8.3|automatisé le déploiement]] avec <strong>GitHub Actions</strong> (fichier
                   <code>deploy.yml</code>) : au point ((3)), chaque push validé sur <code>main</code> déclenche le
                   <strong>déploiement complet</strong> — build de l'app et de l'admin, <strong>migrations de base de
                   données</strong>, redémarrage des services. Au point ((4)), un <strong>contrôle de santé</strong>
                   (health-check) bloque toute mise en ligne défaillante, puis les moteurs de recherche sont notifiés
                   (IndexNow) — fini les mises en ligne manuelles risquées.` }
        ]
      },

      /* ---------- BILAN SUIVI ---------- */
      {
        id: "bilan", kind: "bilan",
        tab: "Bilan & analyse",
        title: "Bilan — suivi de projet",
        intro:
          `Mener ce projet sur deux mois pour un client réel m'a fait progresser sur un savoir-faire de gestion de
           projet que les cours n'abordent que partiellement, faute de projet d'une telle ampleur.`,
        scale: ["Débutant", "Notions", "Moyen", "Bon", "Avancé"],
        blocks: [
          {
            color: "#e0871a", domain: "Gestion de projet",
            title: "Piloter un projet de développement, du besoin à la livraison",
            recap: [
              { k: "Recueil & cadrage", t: "réunions, cahier des charges, DAT (trace 7).", tags: ["stage", "diff"] },
              { k: "Traduction & priorisation", t: "du métier au technique (trace 7).", tags: ["stage"] },
              { k: "Journal de bord & suivi des tâches", t: "Kanban Trello, sprints agiles (trace 8).", tags: ["stage", "diff"] },
              { k: "Planification", t: "Gantt, BurnUp, bilans de sprint (trace 8).", tags: ["cours", "stage"] },
              { k: "Versioning", t: "Git, commits conventionnels (trace 9).", tags: ["cours", "stage"] },
              { k: "Intégration & déploiement continus", t: "CI/CD GitHub Actions (trace 9).", tags: ["stage", "perso", "diff"] }
            ],
            before: 1, after: 3,
            justif:
              `Git et les bases du versioning avaient été vus en <strong>SAÉ S3 & S4</strong>. La gestion de projet
               (Kanban, Gantt, sprints) était abordée en cours mais jamais appliquée sur <strong>deux mois réels</strong>,
               du recueil du besoin à la livraison. Tenir un <strong>journal de bord</strong>, cadrer, m'organiser
               en sprints et <strong>automatiser</strong> le déploiement via CI/CD m'a fait passer de « Notions »
               à « Bon ».`
          }
        ]
      }
    ]
  },

  /* =======================================================================
     PAGE 4 — INTÉGRATION  (1 savoir-faire général × 2 traces)
     ===================================================================== */
  integration: {
    kicker: "Volet 3 · Intégration & travail en entreprise",
    title: "Intégration en entreprise",
    summary:
      `Un stage, c'est aussi s'intégrer dans une structure et travailler avec ses membres. Deux traces
       montrent comment j'ai <strong>accompagné les utilisateurs</strong> (la documentation du bureau) et comment
       j'ai été <strong>force de proposition</strong> en agissant en <strong>autonomie</strong>.`,
    subpages: [

      /* ---------- TRACE 9 : Documentation du bureau ---------- */
      {
        id: "trace-9", kind: "trace", number: 10,
        tab: "Documentation",
        title: "Rédiger un guide d'utilisation pour autonomiser le bureau",
        domain: { label: "Communication", color: "#d9576f" },
        skills: [
          { id: "se9.1", label: "Rédiger une documentation claire", color: "#d9576f" },
          { id: "se9.2", label: "Vulgariser pour l'utilisateur",    color: "#e0871a" },
          { id: "se9.3", label: "Accompagner par l'interface (UX)",  color: "#2196c9" }
        ],
        figure: {
          type: "doc", file: "GUIDE_BUREAU.md",
          caption: "Extrait du guide remis au bureau pour qu'il gère le site en toute autonomie.",
          legend: [
            { n: 1, cls: "",   text: "Sommaire structuré par tâche concrète" },
            { n: 2, cls: "h2", text: "Vulgarisation (explication des statuts de dossier)" },
            { n: 3, cls: "h3", text: "FAQ : anticiper les questions des bénévoles" }
          ],
          doc: {
            title: "Guide du bureau — gérer le site USPV Judo",
            sommaire: [
              "1. Se connecter à l'espace de gestion",
              "2. Valider une pré-inscription (les dossiers)",
              "3. Mettre à jour les horaires et les tarifs",
              "4. Publier un événement et des photos",
              "5. Gérer la boutique et les ceintures"
            ],
            sommaireHot: 1,
            extract: {
              heading: "2. Comprendre les statuts d'un dossier",
              text: "« En attente : la famille vient de s'inscrire. Incomplet : il manque un justificatif (certificat médical…). Validé : le dossier est complet, l'adhésion est enregistrée. Vous n'avez qu'à cliquer pour faire passer un dossier d'un statut à l'autre. »",
              hot: 2
            },
            faq: { q: "« Le bouton Enregistrer reste grisé : pensez à activer le mode édition en haut de page. »", hot: 3 }
          }
        },
        general:
          `<p>La <strong>trace n°10</strong> est le <strong><a href="GUIDE-UTILISATION.pdf" target="_blank" class="rlink">guide d'utilisation</a></strong> que j'ai rédigé pour le
           bureau. Construire l'outil ne suffit pas : pour rendre des <strong>bénévoles non informaticiens</strong>
           réellement autonomes, il fallait un <a href="GUIDE-UTILISATION.pdf" target="_blank" class="rlink">guide</a> qu'ils suivent seuls.</p>
           <p>C'est un livrable de <strong>communication</strong> qui assure la <strong>pérennité</strong> du projet
           après mon départ.</p>`,
        details: [
          { skillId: "se9.1",
            html: `J'ai [[se9.1|rédigé une documentation claire]], orientée <strong>tâches concrètes</strong>
                   (point ((1))) plutôt que fonctions techniques, avec une FAQ (point ((3))) répondant par avance
                   aux blocages courants.` },
          { skillId: "se9.2",
            html: `J'ai [[se9.2|vulgarisé]] en me mettant à la place d'un bénévole : au point ((2)), j'explique les
                   <strong>statuts d'un dossier</strong> avec des mots simples, sans jargon.` },
          { skillId: "se9.3",
            html: `J'ai aussi [[se9.3|accompagné par l'interface]] elle-même : un <strong>« mode édition »</strong>
                   explicite et des <strong>rappels de sauvegarde</strong> guident l'utilisateur et évitent les
                   fausses manœuvres — la doc et l'UX se complètent.` }
        ]
      },

      /* ---------- TRACE 10 : Force de proposition (module Tournoi) ---------- */
      {
        id: "trace-10", kind: "trace", number: 11,
        tab: "Autonomie & proposition",
        title: "Proposer et concevoir un module additionnel hors cahier des charges",
        domain: { label: "Travail en entreprise", color: "#d9576f" },
        skills: [
          { id: "se10.1", label: "Comprendre l'organisation du club", color: "#d9576f" },
          { id: "se10.2", label: "Être force de proposition",          color: "#e0871a" },
          { id: "se10.3", label: "Agir en autonomie mesurée",          color: "#1ea672" }
        ],
        figure: {
          type: "chat", file: "Module Tournoi (proposition validée en réunion)",
          caption: "Le module d'inscription au tournoi : une fonctionnalité que j'ai proposée hors cahier des charges.",
          legend: [
            { n: 1, cls: "",   text: "Besoin réel observé : gestion du tournoi annuel" },
            { n: 2, cls: "h2", text: "Proposition spontanée : inscription en ligne des clubs" },
            { n: 3, cls: "h3", text: "Solution livrée en autonomie" }
          ],
          thread: [
            { who: "animateur", name: "Le bureau", text: "Chaque année on organise le tournoi du club. Aujourd'hui les autres clubs nous envoient leurs judokas par e-mail : c'est long et source d'erreurs.", hot: 1 },
            { who: "me", name: "Moi (stagiaire)", text: "Et si chaque club s'inscrivait en ligne avec un code, et saisissait lui-même ses participants (poids, grade, catégorie) ?", hot: 2 },
            { who: "animateur", name: "Le bureau", text: "Ce serait parfait — on n'avait pas osé le demander.", hot: 0 },
            { who: "me", name: "Moi (stagiaire)", text: "Je le développe : module Tournoi avec accès par club, validé puis testé avant la mise en ligne.", hot: 3 }
          ]
        },
        general:
          `<p>La <strong>trace n°11</strong> est le <strong>module Tournoi</strong> que j'ai conçu. Il n'était
           <em>pas</em> dans le cahier des charges : en discutant avec le bureau, j'ai compris que le club
           <strong>organise un tournoi annuel</strong> et gère péniblement les inscriptions des clubs invités par
           e-mail. J'ai donc <strong>proposé</strong> un module dédié.</p>
           <p>Il illustre mon <strong>intégration</strong> : comprendre l'organisation pour proposer un outil utile,
           et le réaliser en autonomie.</p>`,
        details: [
          { skillId: "se10.1",
            html: `Pour ce module, j'ai dû [[se10.1|comprendre l'organisation du club]] : comment se déroule le
                   tournoi, qui inscrit qui (point ((1))), et quelles informations sont nécessaires (poids, grade,
                   catégorie d'âge FFJDA).` },
          { skillId: "se10.2",
            html: `J'ai été [[se10.2|force de proposition]] : l'inscription en ligne par club (point ((2))) est une
                   idée que j'ai apportée spontanément, validée en réunion — pas une simple commande à exécuter.` },
          { skillId: "se10.3",
            html: `J'ai [[se10.3|agi en autonomie mesurée]] : proposer, faire valider, puis livrer (point ((3))) un
                   module complet (accès par code, saisie des participants, finalisation) — sans partir dans des
                   développements non prioritaires.` }
        ]
      },

      /* ---------- BILAN INTÉGRATION ---------- */
      {
        id: "bilan", kind: "bilan",
        tab: "Bilan & analyse",
        title: "Bilan — intégration en entreprise",
        intro:
          `Ces savoir-faire « humains » se travaillent difficilement en cours : c'est l'immersion qui les développe.
           Le stage a été ma première expérience de ce type dans une structure réelle.`,
        scale: ["Débutant", "Notions", "Moyen", "Bon", "Avancé"],
        blocks: [
          {
            color: "#d9576f", domain: "Travail en entreprise",
            title: "S'intégrer et accompagner les utilisateurs en entreprise",
            recap: [
              { k: "Comprendre l'organisation", t: "saisir le fonctionnement du club (trace 11).", tags: ["stage"] },
              { k: "Force de proposition", t: "proposer le module Tournoi (trace 11).", tags: ["stage", "diff"] },
              { k: "Autonomie mesurée", t: "proposer → valider → livrer (trace 11).", tags: ["stage", "perso"] },
              { k: "Documentation & vulgarisation", t: "le <a href=\"GUIDE-UTILISATION.pdf\" target=\"_blank\" class=\"rlink\">guide du bureau</a> (trace 10).", tags: ["cours", "stage"] }
            ],
            before: 1, after: 3,
            justif:
              `Première vraie immersion associative : j'ai appris à <strong>m'intégrer</strong>, à oser
               <strong>proposer</strong>, à travailler en autonomie et à <strong>accompagner</strong> des utilisateurs
               réels non techniques par une documentation claire. Progression de « Notions » à « Bon ».`
          }
        ]
      }
    ]
  }
};
