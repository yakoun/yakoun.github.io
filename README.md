# ElectroDev Portfolio

Portfolio professionnel pour électrotechnicien & développeur — SvelteKit 4 + Supabase + Chart.js + Tailwind CSS.

## Stack

| Couche | Technologie |
|--------|-------------|
| Frontend | Svelte 4 + SvelteKit 2 + TypeScript |
| Styling | Tailwind CSS 3 (dark mode, Inter + JetBrains Mono) |
| Icons | Lucide Svelte |
| Charts | Chart.js 4 (radar, barres, timeline) |
| PDF CV | html2canvas + jsPDF |
| Backend | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| Déploiement | Docker + Nginx (Oracle Cloud) |

## Pages publiques

| Page | Description |
|------|-------------|
| **Accueil** | Hero split (image outils électriques), services (image set électrique), bandeau expertise (pylône HT + stats), projets récents, CTA |
| **CV / À propos** | Profil, compétences animées, timeline expériences/formations, certifications, langues, loisirs, logiciels. Export PDF et impression |
| **Projets** | Grille responsive avec effet 3D tilt, filtres par catégorie (émojis), recherche, projets à la une en hero cards, animations d'entrée `fly` |
| **Projet détail** | Carrousel d'images, infos, technologies, partage, projets similaires |
| **Galerie** | Grille masonry, lightbox (clavier, swipe), filtres par catégorie |
| **Contact** | Formulaire → Supabase messages + WhatsApp |
| **404** | Page d'erreur personnalisée avec code status + boutons retour/accueil |

## Admin dashboard

| Fonctionnalité | Détail |
|----------------|--------|
| **Statistiques** | 12 cartes cliquables, graphiques Chart.js (radar, barres, timeline) |
| **Temps réel** | Toast + badge compteur lors d'un nouveau message (subscribe Realtime) |
| **CRUD complet** | Profil, expériences, formations, compétences, certifications, langues, loisirs, logiciels, projets, services, galerie, messages, paramètres |
| **Auto-seeding** | Données de démonstration pré-remplies si tables vides |
| **Import GitHub** | Sync des repos publics via API GitHub |
| **Upload images** | Supabase Storage (bucket `folio`) |
| **Certifications** | CRUD avec détection automatique table manquante + bouton création via `/api/setup` |
| **Messages** | Marquage lu/non lu, badge compteur dans le header |
| **Responsive** | Barre de navigation inférieure (mobile) avec 5 raccourcis + menu bottom sheet, sidebar desktop conservée |

## Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── (app)/              # Pages publiques
│   │   │   │   ├── +page.svelte                   # Accueil (3 images)
│   │   │   │   ├── a-propos/+page.svelte          # CV complet
│   │   │   │   ├── projets/+page.svelte           # Projets (godmod)
│   │   │   │   ├── projets/[slug]/+page.svelte    # Détail projet
│   │   │   │   ├── galerie/+page.svelte           # Galerie lightbox
│   │   │   │   └── contact/+page.svelte           # Formulaire
│   │   │   ├── (auth)/login/          # Connexion admin
│   │   │   ├── admin/                 # Dashboard CRUD
│   │   │   │   ├── +layout.svelte     # Layout responsive (mobile+desktop)
│   │   │   │   ├── (dashboard)/       # Stats + graphiques + temps réel
│   │   │   │   └── ...                # 14 sections CRUD
│   │   │   ├── api/                   # Endpoints serveur
│   │   │   │   ├── login/             # Auth Supabase
│   │   │   │   ├── setup/             # Création auto des tables
│   │   │   │   └── github-sync/       # Import GitHub
│   │   │   ├── auth/callback/         # OAuth callback
│   │   │   ├── sitemap.xml/           # Sitemap dynamique
│   │   │   └── +error.svelte          # Page 404
│   │   └── lib/
│   │       ├── api/
│   │       │   ├── supabase.ts        # Client public + fonctions seedées
│   │       │   └── supabase-admin.ts  # Client service_role (serveur)
│   │       ├── components/
│   │       │   ├── charts/            # RadarChart, BarChart, TimelineChart
│   │       │   ├── ImageUpload.svelte
│   │       │   ├── ThemeToggle.svelte
│   │       │   └── Carousel.svelte
│   │       ├── stores/theme.ts
│   │       └── types/index.ts
│   ├── supabase/migrations/           # 00001_schema -> 00003_certifications
│   ├── static/images/                 # hero.webp, electrical-set.jpg, pylon.jpg
│   ├── Dockerfile
│   └── package.json
├── scripts/                # setup-server, deploy, backup, update
├── nginx/default.conf
└── docker-compose.yml
```

## Bases de données Supabase

### Tables (RLS activé)

| Table | Public | Admin write | Public insert |
|-------|--------|-------------|---------------|
| `profile_info` | SELECT | OUI | NON |
| `experience` | SELECT | OUI | NON |
| `education` | SELECT | OUI | NON |
| `skills` | SELECT | OUI | NON |
| `certifications` | SELECT | OUI | NON |
| `languages` | SELECT | OUI | NON |
| `hobbies` | SELECT | OUI | NON |
| `software_tools` | SELECT | OUI | NON |
| `projects` | SELECT (featured) | OUI | NON |
| `services` | SELECT | OUI | NON |
| `gallery` | SELECT | OUI | NON |
| `settings` | SELECT | OUI | NON |
| `messages` | NON | Delete | **OUI** |
| `profiles` | NON | Auth only | NON |

### Auth

- Email/password via Supabase Auth
- Route POST `/api/login` → `supabase.auth.signInWithPassword()`
- Admin guard côté client dans `+layout.svelte`
- Session gérée via `supabase.auth.getSession()`

### Realtime

- Dashboard abonné aux INSERT sur `messages`
- Notification toast + compteur en direct
- Cleanup automatique au destroy du composant

### Storage

- Bucket `folio` pour les images de projets
- URLs publiques via `getPublicUrl()`

## Fonctionnalités récentes

- **Page 404 personnalisée** : `+error.svelte` avec code status et navigation
- **Galerie publique** : Lightbox avec navigation clavier, filtres catégorie
- **Sitemap dynamique** : Généré automatiquement depuis les projets Supabase
- **Messages lu/non lu** : Badge compteur + bascule dans le détail
- **Admin responsive** : Bottom nav + bottom sheet sur mobile
- **Seed data** : Toutes les fonctions API ont des données de démonstration en fallback
- **Effet 3D tilt** : Cartes projets avec rotation perspective au survol
- **Images homepage** : 3 images intégrées (héro, services, expertise)

## Installation locale

```bash
# 1. Cloner
git clone https://github.com/.../portfolio.git
cd portfolio/frontend

# 2. Installer les dépendances
npm install

# 3. Configurer Supabase
# Copier .env et renseigner les clés Supabase :
PUBLIC_SUPABASE_URL=votre_url
PUBLIC_SUPABASE_PUBLISHABLE_KEY=votre_cle_publique
SUPABASE_SECRET_KEY=votre_cle_service_role
PUBLIC_SITE_URL=http://localhost:5173

# 4. Créer les tables (SQL Editor Supabase Dashboard)
# Exécuter dans l'ordre :
#   supabase/migrations/00001_schema.sql
#   supabase/migrations/00002_portfolio_cv.sql
#   supabase/migrations/00003_certifications.sql
# Optionnel : supabase/migrations/seed.sql

# 5. Créer l'admin Supabase
# Dans Authentication > Users > Add User
# Email: admin@yakoun.tg, mot de passe au choix

# 6. Lancer en dev
npm run dev
```

### Création automatique des tables

Dans l'admin → Certifications, un bouton **"Créer la table automatiquement"** tente de créer la table via l'API. Si l'API RPC n'est pas disponible, le SQL est affiché pour exécution manuelle dans le dashboard Supabase.

## Déploiement (Oracle Cloud)

```bash
# 1. Initialiser le serveur
bash scripts/setup-server.sh

# 2. Configurer .env (DOMAIN, etc.)

# 3. SSL Let's Encrypt
docker-compose up -d nginx
docker-compose exec nginx certbot --nginx -d votredomaine.fr

# 4. Déployer
bash scripts/deploy.sh production
```

## Scripts

| Script | Usage |
|--------|-------|
| `npm run dev` | Dev serveur (port 5173) |
| `npm run build` | Build production |
| `npm run preview` | Preview production |
| `scripts/deploy.sh` | Déploiement complet Docker |
| `scripts/backup.sh` | Sauvegarde BDD |
| `scripts/update.sh` | Mise à jour système |
| `scripts/setup-server.sh` | Bootstrap serveur Ubuntu |

## Services proposés

- ⚡ Installation électrique (NF C 15-100)
- 📡 Installation parabole (mono/multi-satellite)
- 📶 Zones WiFi mesh
- 📻 Relais WiFi point-to-point (jusqu'à 10 km)
- 🔗 Réseaux RJ45, fibre, switch, VLAN
- 💻 Développement web, mobile, prototypage

---

Portfolio par **Ouniboryabi YAKOUN** — [yakounouniboryabi@gmail.com](mailto:yakounouniboryabi@gmail.com)
