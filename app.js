// ─── COMPTES ──────────────────────────────────────────────────────────────────

const ACCOUNTS = {
  zaynab: {
    pass:     hashSimple('admin2026'),
    role:     'Admin',
    label:    'Zaynab',
    scope:    'Toutes ressources',
    contexts: ['NAALI', 'Insan', 'Perso', 'Les deux', 'Tous'],
  },
  fatiha: {
    pass:     hashSimple('naali2026'),
    role:     'Responsable NAALI',
    label:    'Fatiha',
    scope:    'Ressources NAALI',
    contexts: ['NAALI', 'Les deux', 'Tous'],
  },
  encadrant: {
    pass:     hashSimple('insan2026'),
    role:     'Encadrant Insan',
    label:    'Binôme encadrant',
    scope:    'Ressources Insan',
    contexts: ['Insan', 'Les deux', 'Tous'],
  },
};

function hashSimple(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

let currentUser = null;

// ─── DONNÉES PAR DÉFAUT ────────────────────────────────────────────────────────

const DEFAULT_DATA = [
  { id: 1,  nom: 'Gorgias',           cat: 'Compte en ligne', ctx: 'NAALI', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://gorgias.com',            note: 'Plateforme de support client — gestion des tickets B2C et B2B' },
  { id: 2,  nom: 'Yuma AI',           cat: 'Compte en ligne', ctx: 'NAALI', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://yuma.ai',                note: 'Agent IA de réponse automatique connecté à Gorgias' },
  { id: 3,  nom: 'HubSpot',           cat: 'Compte en ligne', ctx: 'NAALI', acces: 'Contributeur',  statut: 'Actif',   expiration: '', url: 'https://hubspot.com',            note: 'CRM — suivi des leads et pipeline B2B' },
  { id: 4,  nom: 'Pennylane',         cat: 'Compte en ligne', ctx: 'NAALI', acces: 'Lecture seule', statut: 'Actif',   expiration: '', url: 'https://pennylane.com',          note: 'Logiciel de comptabilité — accès en consultation uniquement' },
  { id: 5,  nom: 'Shopify',           cat: 'Compte en ligne', ctx: 'NAALI', acces: 'Contributeur',  statut: 'Actif',   expiration: '', url: 'https://shopify.com',            note: 'Boutique e-commerce B2C — gestion des commandes et produits' },
  { id: 6,  nom: 'Shippingbo',        cat: 'Compte en ligne', ctx: 'NAALI', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: 'https://shippingbo.com',         note: 'Gestion des expéditions et suivi des livraisons' },
  { id: 7,  nom: 'Stay AI',           cat: 'Abonnement',      ctx: 'NAALI', acces: 'Contributeur',  statut: 'Actif',   expiration: '2026-09-01', url: 'https://www.stayai.co', note: 'Outil de rétention et gestion des abonnements clients' },
  { id: 8,  nom: 'Yotpo',             cat: 'Abonnement',      ctx: 'NAALI', acces: 'Contributeur',  statut: 'Actif',   expiration: '2026-09-01', url: 'https://yotpo.com',     note: 'Plateforme avis clients et fidélisation' },
  { id: 9,  nom: 'Agendrix',          cat: 'Compte en ligne', ctx: 'Insan', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: 'https://agendrix.com',           note: 'Gestion des plannings et suivi des présences' },
  { id: 10, nom: 'Ajax',              cat: 'Logiciel',        ctx: 'Insan', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: '',                               note: 'Outil interne utilisé dans le cadre pédagogique' },
  { id: 11, nom: 'Canva',             cat: 'Logiciel',        ctx: 'Insan', acces: 'Contributeur',  statut: 'Actif',   expiration: '', url: 'https://canva.com',              note: 'Création de supports visuels et contenus pédagogiques' },
  { id: 12, nom: 'Pack Office',       cat: 'Licence',         ctx: 'Insan', acces: 'Utilisateur',   statut: 'Actif',   expiration: '2026-08-31', url: 'https://office.com',    note: 'Word, Excel, PowerPoint — rédaction et reporting' },
  { id: 13, nom: 'Kahoot',            cat: 'Compte en ligne', ctx: 'Insan', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://kahoot.com',             note: 'Quiz interactifs pour animations pédagogiques' },
  { id: 14, nom: 'Wooclap',           cat: 'Compte en ligne', ctx: 'Insan', acces: 'Contributeur',  statut: 'Actif',   expiration: '', url: 'https://wooclap.com',            note: 'Interactions en temps réel durant les séances' },
  { id: 15, nom: 'Google Classroom',  cat: 'Compte en ligne', ctx: 'Insan', acces: 'Contributeur',  statut: 'Actif',   expiration: '', url: 'https://classroom.google.com',   note: 'Plateforme de gestion des cours et dépôts de ressources' },
  { id: 16, nom: 'Genially',          cat: 'Compte en ligne', ctx: 'Insan', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: 'https://genially.com',           note: 'Création de présentations et contenus interactifs' },
  { id: 17, nom: 'GitHub',            cat: 'Compte en ligne', ctx: 'Perso', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://github.com',             note: 'Hébergement des projets BTS et portfolio' },
  { id: 18, nom: 'VS Code',           cat: 'Logiciel',        ctx: 'Perso', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://code.visualstudio.com',  note: 'Éditeur principal pour tous les projets web' },
  { id: 19, nom: 'Figma',             cat: 'Logiciel',        ctx: 'Perso', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: 'https://figma.com',              note: 'Maquettes UI, wireframes et DA portfolio' },
  { id: 20, nom: 'Adobe Photoshop',   cat: 'Licence',         ctx: 'Perso', acces: 'Utilisateur',   statut: 'Expiré',  expiration: '2025-05-01', url: 'https://adobe.com/photoshop',    note: 'Licence étudiante expirée — retouche photo et visuels' },
  { id: 21, nom: 'Adobe Illustrator', cat: 'Licence',         ctx: 'Perso', acces: 'Utilisateur',   statut: 'Expiré',  expiration: '2025-05-01', url: 'https://adobe.com/illustrator',  note: 'Licence étudiante expirée — création vectorielle' },
  { id: 22, nom: 'Adobe XD',          cat: 'Licence',         ctx: 'Perso', acces: 'Utilisateur',   statut: 'Inactif', expiration: '', url: 'https://adobe.com/xd',           note: 'Remplacé par Figma dans le workflow' },
  { id: 23, nom: 'Vercel',            cat: 'Compte en ligne', ctx: 'Perso', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://vercel.com',             note: 'Déploiement des projets web perso' },
  { id: 24, nom: 'Notion',            cat: 'Compte en ligne', ctx: 'Perso', acces: 'Admin',         statut: 'Actif',   expiration: '', url: 'https://notion.so',              note: 'Organisation perso — notes, veille, suivi de projets' },
  { id: 25, nom: 'ChatGPT',           cat: 'Compte en ligne', ctx: 'Perso', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: 'https://chat.openai.com',        note: 'Assistance rédactionnelle et recherche' },
  { id: 26, nom: 'Claude',            cat: 'Compte en ligne', ctx: 'Perso', acces: 'Utilisateur',   statut: 'Actif',   expiration: '', url: 'https://claude.ai',              note: 'Développement et projets BTS' },
];

// ─── LOCALSTORAGE ──────────────────────────────────────────────────────────────

function computeStatut(r) {
  if (!r.expiration) return r.statut;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exp = new Date(r.expiration);
  const diff = Math.floor((exp - today) / (1000 * 60 * 60 * 24));
  if (diff < 0)  return 'Expiré';
  if (diff <= 30) return 'Expire bientôt';
  return 'Actif';
}

function getResources() {
  const raw = localStorage.getItem('leadadmin_resources');
  const data = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  return data.map(r => ({ ...r, statut: computeStatut(r) }));
}

function saveResources(data) {
  localStorage.setItem('leadadmin_resources', JSON.stringify(data));
}

function getNextId(data) {
  return data.length ? Math.max(...data.map(r => r.id)) + 1 : 1;
}

function filteredForUser(data) {
  if (!currentUser) return [];
  const acc = ACCOUNTS[currentUser];
  return data.filter(r => acc.contexts.includes(r.ctx));
}

// ─── AUTHENTIFICATION ──────────────────────────────────────────────────────────

function doLogin() {
  const u   = document.getElementById('login-user').value.trim().toLowerCase();
  const p   = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');

  if (ACCOUNTS[u] && ACCOUNTS[u].pass === hashSimple(p)) {
    err.style.display = 'none';
    currentUser = u;
    startApp();
  } else {
    err.style.display = 'block';
  }
}

function doLogout() {
  currentUser = null;
  document.getElementById('app-screen').style.display  = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
}

function startApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-screen').style.display   = 'block';
  document.body.style.alignItems     = 'stretch';
  document.body.style.justifyContent = 'stretch';

  const acc = ACCOUNTS[currentUser];
  document.getElementById('session-role-label').textContent  = acc.role;
  document.getElementById('session-name-label').textContent  = acc.label;
  document.getElementById('session-scope-label').textContent = acc.scope;

  const canAdd = currentUser === 'zaynab';
  document.getElementById('nav-add').style.display      = canAdd ? 'flex'        : 'none';
  document.getElementById('dash-add-btn').style.display = canAdd ? 'inline-flex' : 'none';
  document.getElementById('inv-add-btn').style.display  = canAdd ? 'inline-flex' : 'none';
  document.getElementById('f-ctx').style.display        = canAdd ? 'block'       : 'none';

  showPage('dashboard', document.querySelector('.nav-item'));
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

function showPage(name, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  if (el) el.classList.add('active');
  if (name === 'dashboard')  renderDashboard();
  if (name === 'inventaire') renderTable();
}

// ─── PILLS ────────────────────────────────────────────────────────────────────

function statusPill(s) {
  const map = {
    Actif: 'pill-green',
    Inactif: 'pill-amber',
    Expiré: 'pill-red',
    'Expire bientôt': 'pill-orange'
  };
  return `<span class="pill ${map[s] || 'pill-gray'}">${s}</span>`;
}

function accessPill(a) {
  const map = { Admin: 'pill-accent', Contributeur: 'pill-blue', Utilisateur: 'pill-gray', 'Lecture seule': 'pill-gray' };
  return `<span class="pill ${map[a] || 'pill-gray'}">${a}</span>`;
}

function ctxPill(c) {
  const map = { NAALI: 'pill-blue', Insan: 'pill-pink', Perso: 'pill-gray', 'Les deux': 'pill-amber', Tous: 'pill-accent' };
  return `<span class="pill ${map[c] || 'pill-gray'}">${c}</span>`;
}

function catPill(c) {
  const map = { 'Compte en ligne': 'pill-blue', Logiciel: 'pill-gray', Licence: 'pill-amber', Abonnement: 'pill-accent' };
  return `<span class="pill ${map[c] || 'pill-gray'}">${c}</span>`;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function renderDashboard() {
  const all  = getResources();
  const data = filteredForUser(all);

  const total   = data.length;
  const actifs  = data.filter(r => r.statut === 'Actif').length;
  const expirés = data.filter(r => r.statut === 'Expiré').length;
  const naali   = data.filter(r => r.ctx === 'NAALI' || r.ctx === 'Les deux' || r.ctx === 'Tous').length;

  document.getElementById('metrics-row').innerHTML = `
    <div class="metric-card"><div class="metric-label">Total</div><div class="metric-value">${total}</div><div class="metric-sub">ressources</div></div>
    <div class="metric-card"><div class="metric-label">Actifs</div><div class="metric-value" style="color:var(--green)">${actifs}</div><div class="metric-sub">en service</div></div>
    <div class="metric-card"><div class="metric-label">Expirés</div><div class="metric-value" style="color:var(--red)">${expirés}</div><div class="metric-sub">à renouveler</div></div>
    <div class="metric-card"><div class="metric-label">NAALI</div><div class="metric-value" style="color:var(--accent)">${naali}</div><div class="metric-sub">outils alternance</div></div>
  `;

  // Graphique barres — catégories
  const cats      = ['Compte en ligne', 'Logiciel', 'Licence', 'Abonnement'];
  const catColors = ['#4338CA', '#166534', '#B45309', '#1E40AF'];
  const catCounts = cats.map(c => data.filter(r => r.cat === c).length);
  const maxV      = Math.max(...catCounts, 1);

  document.getElementById('bar-chart').innerHTML = cats.map((c, i) => `
    <div class="bar-col">
      <div class="bar-val">${catCounts[i]}</div>
      <div class="bar" style="height:${Math.round((catCounts[i] / maxV) * 72)}px; background:${catColors[i]}"></div>
      <div class="bar-lbl">${c.replace(' en ligne', '')}</div>
    </div>
  `).join('');

  // Graphique donut — niveaux d'accès
  const accLevels = ['Lecture seule', 'Utilisateur', 'Contributeur', 'Admin'];
  const accColors = ['#9E9C97', '#55534E', '#1E40AF', '#4338CA'];
  const accCounts = accLevels.map(a => data.filter(r => r.acces === a).length);
  const tot2      = accCounts.reduce((a, b) => a + b, 0) || 1;

  let angle = -Math.PI / 2;
  const cx = 45, cy = 45, ro = 38, ri = 24;

  const slices = accCounts.map((v, i) => {
    if (v === 0) return '';
    const a   = (v / tot2) * Math.PI * 2;
    const x1o = cx + ro * Math.cos(angle), y1o = cy + ro * Math.sin(angle);
    const x1i = cx + ri * Math.cos(angle), y1i = cy + ri * Math.sin(angle);
    angle += a;
    const x2o = cx + ro * Math.cos(angle), y2o = cy + ro * Math.sin(angle);
    const x2i = cx + ri * Math.cos(angle), y2i = cy + ri * Math.sin(angle);
    const lg  = a > Math.PI ? 1 : 0;
    return `<path d="M${x1o},${y1o} A${ro},${ro} 0 ${lg},1 ${x2o},${y2o} L${x2i},${y2i} A${ri},${ri} 0 ${lg},0 ${x1i},${y1i} Z" fill="${accColors[i]}" stroke="white" stroke-width="1.5"/>`;
  });

  document.getElementById('donut-svg').innerHTML     = slices.join('');
  document.getElementById('donut-legend').innerHTML  = accLevels.map((a, i) => accCounts[i] > 0 ? `
    <div class="legend-row"><div class="legend-dot" style="background:${accColors[i]}"></div>${a} (${accCounts[i]})</div>
  ` : '').join('');

  // Alertes
  const problems = data.filter(r => r.statut !== 'Actif');
  document.getElementById('alerts-list').innerHTML = problems.length
    ? problems.map(r => `
        <div class="alert-row">
          ${statusPill(r.statut)}
          <span class="alert-name">${r.nom}</span>
          ${ctxPill(r.ctx)}
          ${r.note ? `<span class="alert-meta">${r.note}</span>` : ''}
        </div>
      `).join('')
    : '<div style="font-size:12px;color:var(--text-3);padding:6px 0">Tout est en ordre.</div>';
}

// ─── INVENTAIRE ───────────────────────────────────────────────────────────────

function renderTable() {
  const all  = getResources();
  const data = filteredForUser(all);

  const q  = (document.getElementById('search-input').value || '').toLowerCase();
  const fc = document.getElementById('f-cat').value;
  const fs = document.getElementById('f-statut').value;
  const fa = document.getElementById('f-acces').value;
  const fx = document.getElementById('f-ctx').value;

  const filtered = data.filter(r =>
    (!q  || r.nom.toLowerCase().includes(q) || (r.note || '').toLowerCase().includes(q)) &&
    (!fc || r.cat    === fc) &&
    (!fs || r.statut === fs) &&
    (!fa || r.acces  === fa) &&
    (!fx || r.ctx    === fx)
  );

  const canDelete = currentUser === 'zaynab';
  const tbody     = document.getElementById('table-body');

  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">Aucune ressource trouvée.</div></td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td style="font-weight:500; cursor:pointer" onclick="openDetail(${r.id})">${r.nom}</td>
      <td>${catPill(r.cat)}</td>
      <td>${ctxPill(r.ctx)}</td>
      <td>${accessPill(r.acces)}</td>
      <td>${statusPill(r.statut)}</td>
      <td>${r.url
        ? `<a class="url-link" href="${r.url}" target="_blank">Ouvrir <i class="ti ti-external-link" style="font-size:10px"></i></a>`
        : '<span style="color:var(--text-3)">—</span>'}</td>
      <td style="text-align:center">${canDelete
        ? `<button class="action-btn" onclick="deleteResource(${r.id})" title="Supprimer"><i class="ti ti-trash"></i></button>`
        : ''}</td>
    </tr>
  `).join('');
}

// ─── MODAL DÉTAIL ─────────────────────────────────────────────────────────────

function openDetail(id) {
  const r = getResources().find(x => x.id === id);
  if (!r) return;

  document.getElementById('modal-title').textContent = r.nom;
  document.getElementById('modal-body').innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px; font-size:13px">
      <div class="modal-detail-grid">
        <div><div class="modal-field-label">Catégorie</div>${catPill(r.cat)}</div>
        <div><div class="modal-field-label">Contexte</div>${ctxPill(r.ctx)}</div>
        <div><div class="modal-field-label">Niveau d'accès</div>${accessPill(r.acces)}</div>
        <div><div class="modal-field-label">Statut</div>${statusPill(r.statut)}</div>
      </div>
      ${r.url  ? `<div><div class="modal-field-label">URL</div><a class="url-link" href="${r.url}" target="_blank">${r.url}</a></div>` : ''}
      ${r.note ? `<div><div class="modal-field-label">Note</div><div class="modal-field-note">${r.note}</div></div>` : ''}
    </div>
  `;

  document.getElementById('detail-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('detail-modal').classList.remove('open');
}

document.getElementById('detail-modal').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// ─── CRUD ─────────────────────────────────────────────────────────────────────

function deleteResource(id) {
  if (!confirm('Supprimer cette ressource ?')) return;
  const data = getResources().filter(r => r.id !== id);
  saveResources(data);
  renderTable();
  renderDashboard();
}

function addResource() {
  const nom    = document.getElementById('f-nom').value.trim();
  const cat    = document.getElementById('f-cat-add').value;
  const ctx    = document.getElementById('f-ctx-add').value;
  const acces  = document.getElementById('f-acces-add').value;
  const statut = document.getElementById('f-statut-add').value;
  const url    = document.getElementById('f-url-add').value.trim();
  const note   = document.getElementById('f-note-add').value.trim();
  const msg    = document.getElementById('form-msg');
  const expiration = document.getElementById('f-exp-add').value;

  if (!nom || !cat || !ctx || !acces || !statut) {
    msg.textContent  = 'Remplis tous les champs obligatoires.';
    msg.className    = 'form-msg error';
    msg.style.display = 'block';
    return;
  }

  const data = getResources();
  data.push({ id: getNextId(data), nom, cat, ctx, acces, statut, expiration, url, note });
  saveResources(data);

  ['f-nom', 'f-url-add', 'f-note-add'].forEach(id => document.getElementById(id).value = '');
  ['f-cat-add', 'f-ctx-add', 'f-acces-add', 'f-statut-add', 'f-exp-add'].forEach(id => document.getElementById(id).value = '');
  msg.style.display = 'none';

  showPage('inventaire', document.querySelectorAll('.nav-item')[1]);
}

// ─── EXPORT CSV ───────────────────────────────────────────────────────────────

function exportCSV() {
  const data    = filteredForUser(getResources());
  const headers = ['Nom', 'Catégorie', 'Contexte', 'Niveau accès', 'Statut', 'URL', 'Note'];
  const rows    = data.map(r =>
    [r.nom, r.cat, r.ctx, r.acces, r.statut, r.url || '', r.note || '']
      .map(v => '"' + String(v).replace(/"/g, '""') + '"')
      .join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const a   = document.createElement('a');
  a.href    = 'data:text/csv;charset=utf-8,' + encodeURIComponent('\uFEFF' + csv);
  a.download = 'leadadmin-export.csv';
  a.click();
}

// MOT DE PASSE 

function togglePassword() {
  const input = document.getElementById('login-pass');
  const icon  = document.getElementById('eye-icon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'ti ti-eye-off';
  } else {
    input.type = 'password';
    icon.className = 'ti ti-eye';
  }
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────

document.getElementById('login-pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});