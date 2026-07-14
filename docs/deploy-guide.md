# Guide de déploiement Oracle Cloud

## 1. Création de l'instance OCI

### Configuration recommandée

- **OS** : Ubuntu 22.04 LTS (minimal)
- **Shape** : VM.Standard.E2.1.Micro (free tier) ou VM.Standard.A1.Flex (4 CPU, 24GB RAM - free)
- **Boot volume** : 50GB (free tier)
- **Réseau** : Assigner une IP publique réservée

### Sécurité OCI

Dans le VCN, ouvrir les ports :
- `22` (SSH)
- `80` (HTTP)
- `443` (HTTPS)

## 2. Connexion SSH

```bash
ssh -i ~/.ssh/ma_cle ubuntu@IP_STATIQUE
```

## 3. Installation du serveur

```bash
# Télécharger et exécuter le script d'installation
wget -qO- https://raw.githubusercontent.com/mon-user/portfolio/main/scripts/setup-server.sh | bash
```

Ou manuellement :

```bash
# Mise à jour système
sudo apt update && sudo apt upgrade -y

# Installation Docker
curl -fsSL https://get.docker.com | sudo bash
sudo usermod -aG docker $USER

# Déconnexion/reconnexion pour appliquer les droits Docker

# Création structure
sudo mkdir -p /opt/portfolio
sudo chown ubuntu:ubuntu /opt/portfolio
```

## 4. Déploiement du projet

```bash
cd /opt/portfolio

# Cloner le dépôt
git clone https://github.com/votre-username/portfolio.git .
# Ou copier les fichiers avec rsync depuis la machine locale :
rsync -avz --exclude 'node_modules' --exclude '.svelte-kit' --exclude 'pb_data' -e "ssh -i ~/.ssh/ma_cle" ./ ubuntu@IP_STATIQUE:/opt/portfolio/

# Configuration
cp .env.example .env
nano .env  # Modifier le domaine

# Lancer l'application
docker-compose up -d

# Vérifier
curl http://localhost
```

## 5. Configuration SSL Let's Encrypt

```bash
# Installer certbot via le conteneur Nginx
docker-compose exec nginx apk add certbot-nginx

# Obtenir le certificat
docker-compose exec nginx certbot --nginx -d electrodev.fr -d www.electrodev.fr \
  --non-interactive --agree-tos --email admin@electrodev.fr

# Vérifier le renouvellement automatique
docker-compose logs certbot
```

## 6. Création du super admin PocketBase

```bash
docker exec -it portfolio-pb pocketbase superuser create admin@electrodev.fr MOT_DE_PASSE_FORT
```

## 7. Import des données initiales

```bash
docker exec -i portfolio-pb pocketbase import < backend/seeds/seed.json
```

Ou via l'interface admin accessible sur `https://electrodev.fr/_/`

## 8. Configuration du monitoring

### Healthcheck

```bash
# Vérification automatique toutes les minutes
*/1 * * * * curl -sf https://electrodev.fr/api/health > /dev/null || docker-compose -f /opt/portfolio/docker-compose.yml restart
```

### Redémarrage automatique

Tous les conteneurs ont `restart: always` configuré.

## 9. Sauvegardes automatiques (cron)

```bash
sudo crontab -e

# Backup quotidien à 2h du matin
0 2 * * * /opt/portfolio/scripts/backup.sh >> /var/log/portfolio-backup.log 2>&1

# Nettoyage hebdomadaire
0 3 * * 0 docker system prune -f >> /var/log/docker-prune.log 2>&1
```

## 10. Mise à jour

```bash
cd /opt/portfolio
git pull origin main
bash scripts/update.sh
```

## Dépannage

### Les conteneurs ne démarrent pas

```bash
docker-compose logs
docker-compose ps
# Vérifier les permissions pb_data
sudo chown -R 1000:1000 backend/pb_data
```

### Erreur 502 Bad Gateway

```bash
# Vérifier que les services internes répondent
docker exec -it portfolio-front wget -qO- http://pocketbase:8090/api/health
docker exec -it portfolio-nginx wget -qO- http://frontend:3000
```

### SSL expiré

```bash
docker-compose exec nginx certbot renew
docker-compose exec nginx nginx -s reload
```

### Problèmes de base de données

```bash
# Restaurer la dernière sauvegarde
docker cp /backups/portfolio/data_*.db portfolio-pb:/pb_data/data.db
docker restart portfolio-pb
```

## Hardening sécurité supplémentaire

1. Désactiver l'accès SSH par mot de passe (`/etc/ssh/sshd_config`)
2. Configurer une clé SSH uniquement
3. Installer et configurer CrowdSec
4. Activer le module security headers dans Nginx (déjà pré-configuré)
5. Configurer OCI WAF pour la couche applicative
