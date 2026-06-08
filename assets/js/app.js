/* =========================================================================
   Moteur de rendu du portfolio — sans dépendance.
   Structure imposée (Cours 2) : 4 pages principales (entête toujours visible),
   les 3 pages de contenu affichent UNE sous-page à la fois via une barre
   d'onglets séparée (traces + bilan). Routage par ancre (#page/sous-page).
   Lit window.PORTFOLIO (data.js).
   ========================================================================= */
(function () {
  "use strict";
  const P = window.PORTFOLIO;

  /* ----------------------------------------------------------- Utilitaires */
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const hotCls = (n) => (n === 2 ? "h2" : n === 3 ? "h3" : n === 4 ? "h4" : "");

  /* Carte globale des savoir-faire élémentaires (id -> {label,color}) */
  const SKILLS = {};
  ["technique", "suivi", "integration"].forEach((pg) => {
    (P[pg].subpages || []).forEach((sp) => {
      (sp.skills || []).forEach((s) => { SKILLS[s.id] = s; });
    });
  });

  /* Ressources du projet : chaque mention dans la prose devient un lien.
     Ordre du plus long au plus court (l'alternation regex essaie de gauche
     à droite, donc les phrases priment sur les mots isolés). */
  const REPO = "https://github.com/LAFAYMehdi/portfolio-uspv-judo";
  const GANTT_URL  = "https://docs.google.com/spreadsheets/d/1rZnGPkroLn90yTaOGX1LJBWGLkimmtp0x-oJm25Cf7E/edit?gid=1115838130#gid=1115838130";
  const BURNUP_URL = "https://docs.google.com/spreadsheets/d/1TaTaBHQ5qRiTDNx_k_GWnCGMGh16XpRssx8894fMKX0/edit?gid=0#gid=0";
  const TRELLO_URL = "https://trello.com/invite/b/69d3a5901cba4bed096fb9c5/ATTIe248703b23a4894b6a1f6664a1621e3648C2F2ED/uspv-judo-suivi-de-projet-gestion-de-taches-trello";
  const RES = [
    ["dossier d'architecture technique", REPO + "/blob/main/DAT.md"],
    ["diagramme de Gantt",               GANTT_URL],
    ["cahier des charges",               REPO + "/blob/main/CDC.md"],
    ["BurnUp Chart",                     BURNUP_URL],
    ["GitHub Actions",                   ""],   /* libellé non cliquable (capté en entier pour éviter un lien partiel sur « GitHub ») */
    ["Git/GitHub",                       REPO],
    ["BurnUp",                           BURNUP_URL],
    ["Gantt",                            GANTT_URL],
    ["Trello",                           TRELLO_URL],
    ["GitHub",                           REPO],
    ["CDC",                              REPO + "/blob/main/CDC.md"],
    ["DAT",                              REPO + "/blob/main/DAT.md"]
  ];
  const URLMAP = {}; RES.forEach(([t, u]) => { URLMAP[t.toLowerCase()] = u; });
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  /* Acronymes : bornes de mot + casse exacte ; phrases : insensibles à la casse. */
  const ACR = new Set(["cdc", "dat", "git/github", "github actions", "github"]);
  const RES_RE = new RegExp(
    RES.map(([t]) => (ACR.has(t.toLowerCase()) ? "\\b" + reEsc(t) + "\\b" : reEsc(t))).join("|"),
    "g"
  );

  /* Enveloppe les mentions de ressources connues par un lien .rlink, en
     n'opérant QUE sur le texte (jamais dans une balise, une ancre existante
     ou un token [[…]] / ((…))). */
  function linkify(html) {
    return String(html)
      .split(/(<a\b[^>]*>[\s\S]*?<\/a>|<[^>]*>|\[\[[^\]]*\]\]|\(\([^)]*\)\))/)
      .map((seg, i) => (i % 2 === 1 ? seg : seg.replace(RES_RE, (m) => {
        const u = URLMAP[m.toLowerCase()];
        return u ? `<a class="rlink" href="${u}" target="_blank" rel="noopener">${m}</a>` : m;
      })))
      .join("");
  }

  /* Résout [[id]] (savoir-faire coloré) et ((N)) (renvoi point remarquable)
     puis auto-lie les ressources (linkify protège déjà tags/ancres/tokens). */
  function tk(html) {
    return linkify(String(html))
      .replace(/\[\[([\w.\-]+)(?:\|([^\]]+))?\]\]/g, (m, id, txt) => {
        const s = SKILLS[id];
        if (!s) return txt || m;
        return `<span class="sf" style="color:${s.color}">${txt || s.label}</span>`;
      })
      .replace(/\(\((\d+)\)\)/g, (m, n) => `<span class="ref r${n}">${n}</span>`);
  }

  /* ------------------------------------------------------------- Icônes SVG */
  const I = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
  };

  /* ============================================================== ENTÊTE */
  function renderHeader() {
    const id = P.identity;
    $("#header").innerHTML =
      `<div class="hd-inner">
         <img class="logo" src="assets/img/logo.png" alt="Logo USPV Judo">
         <div class="id-block">
           <span class="id-name">${id.firstName} <span class="accent">${id.lastName}</span></span>
           <span class="id-sub">${id.formation} · Portfolio de stage</span>
         </div>
         <div class="id-contacts">
           <a class="pill" href="mailto:${id.email}">${I.mail}<span>${id.email}</span></a>
           <a class="pill hide-sm" href="${id.siteUrl}" target="_blank" rel="noopener">${I.link}<span>${id.site}</span></a>
         </div>
       </div>`;
  }

  /* ================================================= NAVIGATION PRINCIPALE */
  function renderTopNav() {
    const items = P.nav.map((n) =>
      `<a class="tn-item" href="#${n.id}" data-page="${n.id}">
         <span class="tn-num">${n.num}</span>${n.label}
       </a>`).join("");
    $("#topnav").innerHTML = `<div class="tn-inner">${items}</div>`;
  }

  function renderFooter() {
    $("#foot").innerHTML =
      `<div class="foot-inner">
         Portfolio de stage — du 7 avril au 5 juin 2026 ·
         <a href="${P.identity.siteUrl}" target="_blank" rel="noopener">${P.identity.site}</a>
       </div>`;
  }

  /* ============================================================ FIGURES */
  function legendHtml(fig, number) {
    const items = (fig.legend || []).map((l) =>
      `<span class="lg"><span class="hot-badge ${hotCls(l.n)}">${l.n}</span>${esc(l.text)}</span>`).join("");
    return `<div class="fig-caption"><span class="fig-no">Trace n°${number}.</span> ${esc(fig.caption)}
              <div class="fig-legend">${items}</div>
            </div>`;
  }
  function figBar(name, repro) {
    const tag = repro
      ? `<span class="fig-repro" title="Reproduction fidèle réalisée pour le portfolio — les données sont réelles">↻ Reproduction</span>`
      : "";
    return `<div class="fig-bar"><span class="fname">${esc(name)}</span>${tag}</div>`;
  }

  /* --- code annoté ligne par ligne --- */
  function renderCode(fig) {
    const lang = fig.lang;
    const tok = lang === "sql" ? "--" : (lang === "php" || lang === "js" ? "//" : "#");
    let prev = null;
    const body = fig.lines.map((ln) => {
      const text = ln[0], hot = ln[1] || 0;
      let safe = esc(text);
      const ci = safe.indexOf(tok);
      if (ci >= 0) safe = safe.slice(0, ci) + '<span class="cmt">' + safe.slice(ci) + "</span>";
      if (safe === "") safe = "&nbsp;";
      let cls = "cline";
      let attr = "";
      if (hot > 0) {
        cls += " hot " + hotCls(hot);
        if (hot !== prev) { cls += " bn"; attr = ` data-n="${hot}"`; }
      }
      prev = hot;
      return `<span class="${cls}"${attr}>${safe}</span>`;
    }).join("");
    return `<pre class="code"><code>${body}</code></pre>`;
  }

  /* --- historique git --- */
  function renderGitlog(fig) {
    const rows = fig.commits.map((c) => {
      const h = c.hot || 0;
      const cls = h ? `hot-row hot ${hotCls(h)} bn` : "gl-plain";
      const attr = h ? ` data-n="${h}"` : "";
      return `<div class="gl-row ${cls}"${attr}>
                <span class="gl-hash">${esc(c.hash)}</span>
                <span class="gl-msg">${esc(c.msg)}</span>
              </div>`;
    }).join("");
    return `<div class="gitlog">${rows}</div>`;
  }

  /* --- tableau besoins -> fonctionnalités --- */
  function renderNeeds(fig) {
    const rows = fig.rows.map((r) => {
      const h = r.hot || 0;
      const cls = h ? `hot-row hot ${hotCls(h)} bn` : "";
      const attr = h ? ` data-n="${h}"` : "";
      return `<div class="need-row ${cls}"${attr}>
                <div class="need-left">${esc(r.need)}</div>
                <div class="need-arrow">→</div>
                <div class="need-right">${esc(r.feat)}</div>
              </div>`;
    }).join("");
    return `<div class="needs"><div class="need-head"><span>Besoin exprimé</span><span></span><span>Fonctionnalité livrée</span></div>${rows}</div>`;
  }

  /* --- document (manuel) --- */
  function renderDoc(fig) {
    const d = fig.doc;
    const som = d.sommaire.map((s) => `<li>${esc(s)}</li>`).join("");
    return `<div class="doc-mock">
              <div class="doc-title">${esc(d.title)}</div>
              <div class="hotbox ${hotCls(d.sommaireHot)}" data-n="${d.sommaireHot}">
                <div class="doc-h">Sommaire</div>
                <ol class="doc-som">${som}</ol>
              </div>
              <div class="hotbox ${hotCls(d.extract.hot)}" data-n="${d.extract.hot}">
                <div class="doc-h">${esc(d.extract.heading)}</div>
                <p class="doc-p">${esc(d.extract.text)}</p>
              </div>
              <div class="hotbox ${hotCls(d.faq.hot)}" data-n="${d.faq.hot}">
                <div class="doc-h">FAQ</div>
                <p class="doc-p">${esc(d.faq.q)}</p>
              </div>
            </div>`;
  }

  /* --- conversation (proposition) --- */
  function renderChat(fig) {
    const msgs = fig.thread.map((m) => {
      const them = m.who === "animateur";
      const h = m.hot || 0;
      const box = h ? `hotbox ${hotCls(h)}` : "";
      const attr = h ? ` data-n="${h}"` : "";
      return `<div class="chat-line ${them ? "left" : "right"}">
                <div class="bubble ${them ? "them" : "me"} ${box}"${attr}>
                  <span class="bubble-name">${esc(m.name)}</span>${esc(m.text)}
                </div>
              </div>`;
    }).join("");
    return `<div class="chat">${msgs}</div>`;
  }

  /* --- tableau Kanban (journal de bord) --- */
  function renderKanban(fig) {
    const cols = fig.columns.map((col) => {
      const ch = col.hot || 0;
      const colCls = ch ? `hot ${hotCls(ch)} bn` : "";
      const colAttr = ch ? ` data-n="${ch}"` : "";
      const cards = (col.cards || []).map((c) => {
        const dh = c.hot || 0;
        const cCls = dh ? `hot ${hotCls(dh)} bn` : "";
        const cAttr = dh ? ` data-n="${dh}"` : "";
        const costBadge = c.cost ? `<span class="kan-cost">${c.cost}</span>` : "";
        return `<div class="kan-card ${cCls}" style="--lab:${c.color || "#9aa0a6"}"${cAttr}>${esc(c.t)}${costBadge}</div>`;
      }).join("");
      return `<div class="kan-col ${colCls}"${colAttr}>
                <div class="kan-head">${esc(col.name)}<span class="kan-count">${(col.cards || []).length}</span></div>
                ${cards}
              </div>`;
    }).join("");
    return `<div class="kanban">${cols}</div>`;
  }

  function renderOneFigure(fig, number) {
    /* "svg" = schéma conçu pour ce portfolio ; les autres types sont des
       reproductions fidèles de fichiers/outils réels. */
    const isRepro = fig.type !== "svg";
    let inner = "";
    if (fig.type === "svg")    inner = `<div class="schema-wrap">${buildSchemaSVG()}</div>`;
    else if (fig.type === "code")   inner = renderCode(fig);
    else if (fig.type === "gitlog") inner = `<div class="fig-pad">${renderGitlog(fig)}</div>`;
    else if (fig.type === "needs")  inner = `<div class="fig-pad">${renderNeeds(fig)}</div>`;
    else if (fig.type === "doc")    inner = `<div class="fig-pad">${renderDoc(fig)}</div>`;
    else if (fig.type === "chat")   inner = `<div class="fig-pad">${renderChat(fig)}</div>`;
    else if (fig.type === "kanban") inner = `<div class="fig-pad kanban-wrap">${renderKanban(fig)}</div>`;
    return `<div class="figure">${figBar(fig.file, isRepro)}${inner}${legendHtml(fig, number)}</div>`;
  }

  /* Une trace porte une figure (sp.figure) ou plusieurs (sp.figures). */
  function renderFigure(sp) {
    const figs = sp.figures || (sp.figure ? [sp.figure] : []);
    return figs.map((f) => renderOneFigure(f, sp.number)).join("");
  }

  /* ============================================================ TRACE */
  function renderTrace(sp) {
    const skills = sp.skills.map((s) =>
      `<span class="sf-chip" style="--sf-c:${s.color}"><span class="dot"></span>${esc(s.label)}</span>`).join("");

    const details = sp.details.map((d) => {
      const s = SKILLS[d.skillId] || { label: "", color: "var(--accent)" };
      return `<div class="detail-item">
                <div class="dhead" style="color:${s.color}">
                  <span class="ddot" style="background:${s.color}"></span>${esc(s.label)}
                </div>
                <div>${tk(d.html)}</div>
              </div>`;
    }).join("");

    return `<div class="trace-head">
              <span class="trace-num">${sp.number}</span>
              <h3 class="trace-title">${esc(sp.title)}</h3>
              <span class="domain-tag" style="color:${sp.domain.color}">${esc(sp.domain.label)}</span>
            </div>
            <div class="block">
              <span class="lbl">Savoir-faire élémentaires mis en jeu</span>
              <div class="sf-row">${skills}</div>
            </div>
            ${renderFigure(sp)}
            <div class="trace-desc">
              <div class="block"><span class="lbl">Description de la trace</span>${tk(sp.general)}</div>
              <div class="block"><span class="lbl">Mise en œuvre des savoir-faire</span>${details}</div>
            </div>`;
  }

  /* ============================================================ BILAN */
  function gauge(scale, before, after) {
    const n = scale.length;
    const pos = (i) => (i / (n - 1)) * 100;
    const labels = scale.map((l) => `<span>${esc(l)}</span>`).join("");
    return `<div class="gauge">
      <div class="scale">
        <span class="track"></span>
        <span class="mark before" style="left:${pos(before)}%"><span class="tip">avant : ${esc(scale[before])}</span></span>
        <span class="mark after" style="left:${pos(after)}%"><span class="tip">après : ${esc(scale[after])}</span></span>
      </div>
      <div class="scale-labels">${labels}</div>
      <div class="gauge-legend">
        <span class="gl"><i class="b"></i>Avant le stage</span>
        <span class="gl"><i class="a"></i>Après le stage</span>
      </div>
    </div>`;
  }

  function renderBilan(sp) {
    const blocks = sp.blocks.map((b) => {
      const recap = b.recap.map((r) => {
        const tags = (r.tags || []).map((t) => {
          const lbl = { cours: "vu en cours", stage: "appris en stage", perso: "appris seul", diff: "difficile" }[t] || t;
          return `<span class="ctx-tag ${t}">${lbl}</span>`;
        }).join("");
        return `<li><span class="rk">${esc(r.k)}</span> — ${tk(esc(r.t))}<span class="tagline">${tags}</span></li>`;
      }).join("");
      return `<div class="bilan-block" style="--blk-c:${b.color}">
                <div class="bb-head">
                  <h3>${esc(b.title)}</h3>
                  <span class="domain-tag" style="color:${b.color}">${esc(b.domain)}</span>
                </div>
                <ul class="recap">${recap}</ul>
                ${gauge(sp.scale, b.before, b.after)}
                <div class="justif">${tk(b.justif)}</div>
              </div>`;
    }).join("");
    return `<p class="bilan-intro">${tk(sp.intro)}</p><div class="bilan-grid">${blocks}</div>`;
  }

  /* ============================================== EN-TÊTE DE PAGE (commun) */
  function pageHead(data) {
    return `<div class="page-head">
        <div class="page-kicker">${esc(data.kicker)}</div>
        <h2 class="page-title">${esc(data.title)}</h2>
        ${data.summary ? `<p class="page-summary">${tk(data.summary)}</p>` : ""}
      </div>`;
  }

  /* ====================================================== ACCUEIL (corps) */
  function homeBody() {
    const a = P.accueil;
    const groups = a.savoirFaire.groups.map((g) => {
      const items = g.items.map((it) =>
        `<a class="sf-link" href="#${g.page}" style="color:${it.color}">${esc(it.label)}</a>`).join("");
      return `<div class="sf-group">
                <div class="sf-grp-head">${esc(g.pageLabel)}</div>
                <div class="sf-grp-items">${items}</div>
              </div>`;
    }).join("");

    return `${pageHead(a)}
      <p class="lead">${tk(a.intro)}</p>

      <div class="arch">
        <div class="arch-title">${esc(a.archTitle)}</div>
        <div class="arch-wrap">${buildArchSVG()}</div>
      </div>

      <div class="cols-2">
        <div class="col">
          <h3 class="section-title">${esc(a.entreprise.title)}</h3>
          ${tk(a.entreprise.html)}
        </div>
        <div class="col">
          <h3 class="section-title">${esc(a.sujet.title)}</h3>
          ${tk(a.sujet.html)}
        </div>
      </div>

      <div class="sf-block">
        <h3 class="section-title">${esc(a.savoirFaire.title)}</h3>
        <p class="muted">${tk(a.savoirFaire.intro)}</p>
        <div class="sf-groups">${groups}</div>
      </div>

      <div class="resources-block">
        <h3 class="section-title">Ressources du projet</h3>
        <p class="muted">Documents de référence, plannings et suivi de projet.</p>

        <div class="res-groups">
          <div class="res-group">
            <span class="res-label">Documents</span>
            <div class="res-links">
              <a class="pill" href="CDC-officiel.pdf" target="_blank" rel="noopener">Cahier des charges — PDF officiel</a>
              <a class="pill" href="DAT-officiel.pdf" target="_blank" rel="noopener">Dossier d'architecture — PDF officiel</a>
            </div>
            <p class="res-note">Les PDF imprimés sont les versions officielles. Aperçus condensés (Markdown) pour la lecture en ligne :
              <a class="rlink" href="https://github.com/LAFAYMehdi/portfolio-uspv-judo/blob/main/CDC.md" target="_blank" rel="noopener">CDC</a>,
              <a class="rlink" href="https://github.com/LAFAYMehdi/portfolio-uspv-judo/blob/main/DAT.md" target="_blank" rel="noopener">DAT</a>.</p>
          </div>

          <div class="res-group">
            <span class="res-label">Plannings</span>
            <div class="res-links">
              <a class="pill" href="https://docs.google.com/spreadsheets/d/1rZnGPkroLn90yTaOGX1LJBWGLkimmtp0x-oJm25Cf7E/edit?gid=1115838130#gid=1115838130" target="_blank" rel="noopener">Planning prévisionnel</a>
              <a class="pill" href="https://docs.google.com/spreadsheets/d/1ox_GHF1bHFgtLE5o0yePbwcH5LjjSBLTD3Xzg-PJeMA/edit?gid=1115838130#gid=1115838130" target="_blank" rel="noopener">Planning réel</a>
            </div>
          </div>

          <div class="res-group">
            <span class="res-label">Suivi</span>
            <div class="res-links">
              <a class="pill" href="https://docs.google.com/spreadsheets/d/1TaTaBHQ5qRiTDNx_k_GWnCGMGh16XpRssx8894fMKX0/edit?gid=0#gid=0" target="_blank" rel="noopener">BurnUp Chart</a>
              <a class="pill" href="https://trello.com/invite/b/69d3a5901cba4bed096fb9c5/ATTIe248703b23a4894b6a1f6664a1621e3648C2F2ED/uspv-judo-suivi-de-projet-gestion-de-taches-trello" target="_blank" rel="noopener">Trello — tâches</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ============================== NAVIGATION DES SOUS-PAGES (barre d'onglets) */
  const subLabel = (sp) => (sp.kind === "bilan" ? "Bilan" : "Trace n°" + sp.number);

  function renderSubNav(pageId, data, activeSubId) {
    const tabs = data.subpages.map((sp) => {
      const active = sp.id === activeSubId ? " active" : "";
      const kind = sp.kind === "bilan" ? " bilan" : "";
      return `<a class="subtab${kind}${active}" href="#${pageId}/${sp.id}">${subLabel(sp)}</a>`;
    }).join("");
    return `<nav class="subnav" aria-label="Navigation des sous-pages">
              <div class="subnav-inner">${tabs}</div>
            </nav>`;
  }

  /* ============================== UNE SOUS-PAGE (trace OU bilan), affichée seule */
  function renderActiveSub(pageId, data, activeSubId) {
    const sp = data.subpages.find((s) => s.id === activeSubId) || data.subpages[0];
    const body = sp.kind === "bilan" ? renderBilan(sp) : renderTrace(sp);
    const tag = sp.kind === "bilan"
      ? `<span class="sub-tag bilan">Bilan</span>`
      : `<span class="sub-tag">Trace n°${sp.number}</span>`;
    return `<article class="sub ${sp.kind}" id="${pageId}-${sp.id}">
              <div class="sub-band">${tag}<span class="sub-name">${esc(sp.kind === "bilan" ? sp.title : sp.tab)}</span></div>
              ${body}
            </article>`;
  }

  /* =================================== ILLUSTRATION ARCHI (accueil) */
  function buildArchSVG() {
    function box(x, y, w, h, title, sub, color) {
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="${color}" stroke-width="1.6"/>`
        + `<text x="${x + w / 2}" y="${y + 30}" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="15" fill="#1b1b1b">${title}</text>`
        + `<text x="${x + w / 2}" y="${y + 50}" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" fill="${color}">${sub}</text>`;
    }
    function conn(x1, x2, y, label) {
      const mx = (x1 + x2) / 2;
      return `<line x1="${x1}" y1="${y}" x2="${x2 - 8}" y2="${y}" stroke="#b8b8b8" stroke-width="1.6" marker-end="url(#arr2)"/>`
        + `<text x="${mx}" y="${y - 9}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" fill="#6b6b6b">${label}</text>`;
    }
    return `<svg viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture : navigateur Nuxt 3, serveur Nitro, base PostgreSQL">
      <defs><marker id="arr2" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto"><path d="M0,0 L6.5,3 L0,6 Z" fill="#b8b8b8"/></marker></defs>
      ${box(18, 45, 185, 70, "Navigateur", "Nuxt 3 · Vue 3", "#8a63e8")}
      ${conn(203, 277, 80, "HTTPS · JSON")}
      ${box(277, 45, 190, 70, "Serveur Nitro", "API · Node", "#1ea672")}
      ${conn(467, 535, 80, "SQL")}
      ${box(535, 45, 168, 70, "PostgreSQL", "Base de données", "#2196c9")}
      <text x="360" y="138" text-anchor="middle" font-family="Inter,sans-serif" font-size="10.5" fill="#8a8a8a">VPS · Nginx · PM2 · TLS Let's Encrypt · déployé par mes soins</text>
    </svg>`;
  }

  /* =============================================== SCHÉMA SVG (trace 1) */
  function buildSchemaSVG() {
    const HC = { 1: "#2196c9", 2: "#1ea672", 3: "#8a63e8" };
    function tbl(x, y, w, name, rows, hot) {
      const rh = 21, hh = 26, h = hh + rows.length * rh + 8;
      let s = "";
      if (hot) {
        s += `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="8" fill="none" stroke="${HC[hot]}" stroke-width="2" stroke-dasharray="5 4"/>`;
        s += `<circle cx="${x - 8}" cy="${y - 8}" r="11" fill="${HC[hot]}"/>`;
        s += `<text x="${x - 8}" y="${y - 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${hot}</text>`;
      }
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#ffffff" stroke="#d9d9d9"/>`;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="6" fill="#f3f4f5"/>`;
      s += `<rect x="${x}" y="${y + hh - 10}" width="${w}" height="10" fill="#f3f4f5"/>`;
      s += `<line x1="${x}" y1="${y + hh}" x2="${x + w}" y2="${y + hh}" stroke="#d9d9d9"/>`;
      s += `<text x="${x + 12}" y="${y + 18}" font-size="12.5" font-weight="700" fill="#1b1b1b" font-family="Inter,sans-serif">${name}</text>`;
      rows.forEach((r, i) => {
        const ty = y + hh + rh * i + 15;
        const col = r.fk ? "#2196c9" : (r.pk ? "#1b1b1b" : "#6b6b6b");
        s += `<text x="${x + 12}" y="${ty}" font-size="11" fill="${col}" font-family="ui-monospace,monospace" font-weight="${r.pk ? "700" : "400"}">${r.t}</text>`;
      });
      return s;
    }
    function arrow(x1, y1, x2, y2) {
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#b8b8b8" stroke-width="1.6" marker-end="url(#arr)"/>`;
    }

    const fam = tbl(30, 36, 150, "famille", [{ t: "id (PK)", pk: 1 }, { t: "email (UNIQUE)" }, { t: "nom" }, { t: "actif" }]);
    const dos = tbl(300, 36, 168, "dossier", [{ t: "id (PK)", pk: 1 }, { t: "famille_id (FK)", fk: 1 }, { t: "statut" }, { t: "date_soumission" }]);
    const enf = tbl(300, 210, 168, "enfant", [{ t: "id (PK)", pk: 1 }, { t: "dossier_id (FK)", fk: 1 }, { t: "nom" }, { t: "date_naissance" }]);
    const rep = tbl(560, 36, 162, "representant", [{ t: "id (PK)", pk: 1 }, { t: "dossier_id (FK)", fk: 1 }, { t: "email" }]);
    const grd = tbl(560, 206, 168, "grade", [{ t: "id (PK)", pk: 1 }, { t: "enfant_id (FK)", fk: 1 }, { t: "ceinture" }, { t: "date_obtention" }], 1);
    const rt = tbl(30, 210, 182, "refresh_token", [{ t: "user_id (sans FK)" }, { t: "role" }, { t: "token_hash" }], 3);

    let lk = "";
    lk += arrow(180, 95, 300, 95);
    lk += `<text x="240" y="88" text-anchor="middle" font-size="9" fill="#8a8a8a" font-family="ui-monospace,monospace">SET NULL</text>`;
    lk += arrow(384, 154, 384, 210);
    lk += `<circle cx="384" cy="182" r="11" fill="${HC[2]}"/><text x="384" y="186" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Inter,sans-serif">2</text>`;
    lk += `<text x="399" y="205" font-size="9" fill="#8a8a8a" font-family="ui-monospace,monospace">ON DELETE CASCADE</text>`;
    lk += arrow(468, 95, 560, 88);
    lk += `<text x="476" y="80" font-size="9" fill="#8a8a8a" font-family="ui-monospace,monospace">CASCADE</text>`;
    lk += arrow(468, 269, 560, 265);
    lk += `<text x="476" y="258" font-size="9" fill="#8a8a8a" font-family="ui-monospace,monospace">1 — N</text>`;
    lk += `<text x="121" y="328" text-anchor="middle" font-size="8.5" fill="#8a8a8a" font-family="ui-monospace,monospace">user_id → utilisateur OU famille</text>`;

    return `<svg viewBox="0 0 760 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma relationnel de la base de données USPV Judo">
      <defs><marker id="arr" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
        <path d="M0,0 L6.5,3 L0,6 Z" fill="#b8b8b8"/></marker></defs>
      ${lk}${fam}${dos}${enf}${rep}${grd}${rt}
    </svg>`;
  }

  /* ============================================================ ROUTAGE */
  const CONTENT = { technique: P.technique, suivi: P.suivi, integration: P.integration };

  function parseHash() {
    const raw = (location.hash || "").replace(/^#/, "");
    const [page, sub] = raw.split("/");
    const valid = page === "accueil" || CONTENT[page];
    return { page: valid ? page : "accueil", sub: sub || null };
  }

  function render() {
    const route = parseHash();

    /* navigation principale : item actif */
    document.querySelectorAll(".tn-item").forEach((a) =>
      a.classList.toggle("active", a.dataset.page === route.page));

    let html;
    if (route.page === "accueil") {
      html = `<div class="page" id="accueil">${homeBody()}</div>`;
    } else {
      const data = CONTENT[route.page];
      const subId = data.subpages.some((s) => s.id === route.sub)
        ? route.sub : data.subpages[0].id;
      html = `<div class="page" id="${route.page}">
                ${pageHead(data)}
                ${renderSubNav(route.page, data, subId)}
                ${renderActiveSub(route.page, data, subId)}
              </div>`;
    }
    $("#content").innerHTML = html;
    window.scrollTo(0, 0);            /* chaque (sous-)page démarre en haut */
  }

  /* ================================================================ INIT */
  function init() {
    renderHeader();
    renderTopNav();
    renderFooter();
    window.addEventListener("hashchange", render);
    render();
    document.title = "Portfolio — USPV Judo";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
