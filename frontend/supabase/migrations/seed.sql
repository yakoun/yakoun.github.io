-- Données initiales
INSERT INTO settings (key, value) VALUES
  ('site_title', 'ElectroDev Pro - Portfolio'),
  ('site_description', 'Électrotechnicien & Développeur - Installations électriques, réseaux WiFi, paraboles satellites et solutions numériques'),
  ('hero_title', 'Électrotechnicien & Créateur de Solutions Numériques'),
  ('hero_subtitle', 'Installation électrique | Réseaux WiFi | Paraboles | Développement'),
  ('phone', '+33 6 00 00 00 00'),
  ('email', 'contact@electrodev.fr'),
  ('whatsapp', '+33600000000'),
  ('address', 'Région Parisienne, France');

INSERT INTO projects (title, slug, description, category, technologies, date, featured) VALUES
  ('Installation électrique résidentielle complète', 'installation-electrique-residentielle', 'Réalisation complète du tableau électrique, câblage et mise aux normes d''une maison de 150m². Installation de disjoncteurs, interrupteurs différentiels, prises RJ45 et détecteurs de fumée.', 'electricite', 'Schneider Electric, Legrand, Hager, NF C 15-100', '2025-06-15', true),
  ('Déploiement fibre optique immeuble 12 étages', 'deploiement-fibre-optique', 'Coordination de l''installation fibre pour 48 logements. Tirage de câbles, pose des PTO, certification des liaisons et mise en service.', 'reseaux', 'Fibre optique, PTO, Splicing, FTTH', '2025-11-20', true),
  ('Couverture WiFi zone rurale - 5km de portée', 'couverture-wifi-rurale', 'Déploiement d''un réseau WiFi longue portée pour couvrir une zone rurale de 3km². Installation de relais WiFi, antennes directionnelles et configuration Mesh.', 'wifi', 'Ubiquiti, MikroTik, Antennes Yagi, Point-to-MultiPoint', '2024-09-10', true),
  ('Application web de gestion de chantier', 'app-gestion-chantier', 'Développement d''une application web pour centraliser la gestion de chantiers électriques : planning, matériel, photos avant/après, et rapports clients.', 'dev-web', 'Svelte, Supabase, Tailwind CSS, TypeScript', '2025-03-01', true);

INSERT INTO skills (name, level, category, description) VALUES
  ('Électricité générale', 5, 'electricite', 'Installation, maintenance, mise aux normes NF C 15-100'),
  ('Tableaux électriques', 5, 'electricite', 'Conception et câblage de tableaux divisionnaires et généraux'),
  ('Réseaux Ethernet', 4, 'reseaux', 'Câblage RJ45, switch, VLAN, dépannage réseau'),
  ('Fibre optique', 4, 'reseaux', 'Soudure fibre, PTO, mesure puissance'),
  ('WiFi Mesh', 5, 'wifi', 'Déploiement WiFi maillé, optimisation couverture'),
  ('Relais WiFi longue portée', 5, 'wifi', 'Point-to-Point, Point-to-MultiPoint, 5GHz/2.4GHz'),
  ('Installation paraboles', 5, 'paraboles', 'Pose, calibrage, multi-satellite, distribution'),
  ('Svelte / SvelteKit', 4, 'dev-web', 'Framework frontend réactif'),
  ('Supabase', 4, 'dev-web', 'Backend BaaS, API REST, Realtime'),
  ('Docker / Linux', 3, 'dev-web', 'Conteneurisation, déploiement serveur');

INSERT INTO services (title, description, icon, "order") VALUES
  ('Installation électrique', 'Installation complète ou partielle de votre installation électrique : tableau, câblage, prises, éclairage. Mise aux normes NF C 15-100. Devis gratuit.', 'zap', 1),
  ('Installation parabole satellite', 'Pose et calibrage professionnel de paraboles pour réception TV satellite. Installation mono et multi-satellites, distribution sur plusieurs pièces.', 'satellite', 2),
  ('Création zone WiFi', 'Étude, conception et déploiement de réseaux WiFi pour particuliers et professionnels. Couverture optimale, sécurité, gestion des accès.', 'wifi', 3),
  ('Relais WiFi longue portée', 'Installation de ponts WiFi longue distance (jusqu''à 10km). Solution pour sites isolés, liaisons inter-bâtiments.', 'radio', 4),
  ('Déploiement réseau', 'Câblage RJ45, fibre optique, switch, routeurs. Réseau d''entreprise, VLAN, firewall, supervision.', 'network', 5),
  ('Développement logiciel', 'Création d''applications web et mobile sur mesure. Solutions numériques modernes : Svelte, Supabase, Tailwind CSS.', 'code', 6);