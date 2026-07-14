#!/bin/bash
# Script de mise à jour et maintenance
# Usage: ./scripts/update.sh

set -euo pipefail

echo "=== Mise à jour système - ElectroDev Portfolio ==="
echo ""

# 1. Mise à jour du système
echo "[1] Mise à jour des paquets système..."
apt update && apt upgrade -y

# 2. Mise à jour Docker et images
echo "[2] Mise à jour Docker..."
docker system prune -f
docker-compose pull
docker-compose build --pull

# 3. Redéploiement
echo "[3] Redéploiement..."
docker-compose up -d --force-recreate

# 4. Vérification certificat SSL
echo "[4] Vérification certificat SSL..."
if [ -f /etc/letsencrypt/live/*/fullchain.pem ]; then
  openssl x509 -enddate -noout -in /etc/letsencrypt/live/*/fullchain.pem
fi

echo ""
echo "=== Mise à jour terminée ==="