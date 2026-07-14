#!/bin/bash
# Script d'installation du serveur Ubuntu pour ElectroDev Portfolio
# À exécuter en tant que root sur une instance OCI Ubuntu fraîche

set -euo pipefail

echo "=== Installation serveur Ubuntu - ElectroDev Portfolio ==="
echo ""

# 1. Mise à jour système
echo "[1/8] Mise à jour système..."
apt update && apt upgrade -y
apt autoremove -y

# 2. Paquets de base
echo "[2/8] Installation paquets de base..."
apt install -y curl wget git ufw fail2ban unattended-upgrades apt-listchanges

# 3. Configuration sécurité
echo "[3/8] Configuration sécurité..."

# Firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Fail2ban
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true

[nginx-http-auth]
enabled = true
EOF
systemctl restart fail2ban

# Mises à jour automatiques
cat > /etc/apt/apt.conf.d/20auto-upgrades << 'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
EOF

# 4. Installation Docker
echo "[4/8] Installation Docker..."
curl -fsSL https://get.docker.com | bash
systemctl enable docker

# 5. Installation docker-compose
echo "[5/8] Installation docker-compose..."
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 6. Création structure projet
echo "[6/8] Création structure projet..."
mkdir -p /opt/portfolio
mkdir -p /backups/portfolio
mkdir -p /var/log/nginx

# 7. Clonage du projet
echo "[7/8] Clonage du dépôt..."
cd /opt/portfolio
if [ ! -d .git ]; then
  git init
  git remote add origin https://github.com/votre-username/portfolio.git
  echo "Ajoutez le remote git puis faites git pull origin main"
fi

# 8. Premier déploiement
echo "[8/8] Premier déploiement..."
cd /opt/portfolio
if [ -f docker-compose.yml ]; then
  docker-compose up -d
  echo "✓ Conteneurs démarrés"
fi

echo ""
echo "=== Installation terminée ==="
echo ""
echo "Prochaines étapes :"
echo "  1. Configurer le domaine dans .env"
echo "  2. Lancer : docker-compose exec nginx certbot --nginx -d electrodev.fr"
echo "  3. Déployer : bash scripts/deploy.sh"