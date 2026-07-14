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

## Structure

```
portfolio/
├── frontend/               # Application SvelteKit
│   ├── src/
│   │   ├── routes/
│   │   │   ├── (app)/      # Pages publiques
│   │   │   │   ├── +page.svelte       # Accueil
│   │   │   │   ├── a-propos/          # CV complet
│   │   │   │   ├── projets/           # Projets + détail
│   │   │   │   └── contact/           # Formulaire
│   │   │   ├── (auth)/login/          # Connexion admin
│   │   │   ├── admin/                 # Dashboard CRUD
│   │   │   │   ├── (dashboard)/       # Stats + graphiques + temps réel
│   │   │   │   ├── profil/
│   │   │   │   ├── experiences/
│   │   │   │   ├── education/
│   │   │   │   ├── skills/
│   │   │   │   ├── certifications/
│   │   │   │   ├── languages/
│   │   │   │   ├── hobbies/
│   │   │   │   ├── software/
│   │   │   │   ├── projects/
│   │   │   │   ├── services/
│   │   │   │   ├── gallery/
│   │   │   │   ├── messages/
│   │   │   │   └── settings/
│   │   │   └── api/                   # Endpoints serveur
│   │   └── lib/
│   │       ├── api/supabase.ts        # Client + fonctions
│   │       ├── components/charts/     # RadarChart, BarChart, TimelineChart
│   │       ├── stores/theme.ts
│   │       └── types/index.ts
│   ├── supabase/
│   │   ├── migrations/                # SQL schema
│   │   └── functions/                 # Edge Functions
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
| `projects` | SELECT | OUI | NON |
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
PUBLIC_SUPABASE_PUBLISHABLE_KEY=votre_cle
PUBLIC_SITE_URL=http://localhost:5173

# 4. Lancer en dev
npm run dev
```

### Créer les tables Supabase

```sql
-- Exécuter dans le SQL Editor Supabase Dashboard
-- migrations/00001_schema.sql
-- migrations/00002_portfolio_cv.sql
-- Puis :
CREATE TABLE certifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  organization text,
  date text,
  description text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
```

### Créer l'admin Supabase

```bash
# Dans Authentication > Users > Add User
# Email: admin@yakoun.tg, mot de passe au choix
```

## Fonctionnalités

### Site public

- **Accueil** : Hero, services, projets récents, CTA
- **CV / À propos** : Compétences animées, timeline expériences, formations, certifications, loisirs. Export PDF et impression.
- **Projets** : Grille, filtres par catégorie, recherche, galerie d'images
- **Contact** : Formulaire → Supabase messages + WhatsApp

### Admin dashboard

- **12 cartes stats** cliquables redirigeant vers chaque section
- **Graphiques Chart.js** : Radar (compétences/catégorie), barres (top compétences, top logiciels), timeline (durée expériences)
- **Temps réel** : Toast et badge lors d'un nouveau message
- **CRUD complet** : Profil, expériences, formations, compétences, certifications, langues, loisirs, logiciels, projets, services, galerie, messages, paramètres
- **Auto-seeding** : Données CV pré-remplies si tables vides
- **Import GitHub** : Sync des repos publics
- **Upload images** : Supabase Storage

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
| `scripts/deploy.sh` | Déploiement complet |
| `scripts/backup.sh` | Sauvegarde BDD |
| `scripts/update.sh` | Mise à jour système |

## Services proposés

- Installation électrique (NF C 15-100)
- Installation parabole (mono/multi-satellite)
- Zones WiFi mesh
- Relais WiFi point-to-point (jusqu'à 10 km)
- Réseaux RJ45, fibre, switch, VLAN
- Développement web, mobile, prototypage

---

Portfolio par **Ouniboryabi YAKOUN** — [yakounouniboryabi@gmail.com](mailto:yakounouniboryabi@gmail.com)
