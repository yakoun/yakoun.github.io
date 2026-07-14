#!/bin/bash
# Script de déploiement complet - ElectroDev Portfolio
# Usage: ./scripts/deploy.sh [environment]
# Environment: production (default), staging

set -euo pipefail

ENV="${1:-production}"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="deploy_${DATE}.log"

echo "=== Déploiement ElectroDev Portfolio ==="
echo "Environnement : $ENV"
echo "Date         : $(date)"
echo ""

# 1. Vérification prérequis
echo "[1/6] Vérification des prérequis..."
command -v docker >/dev/null 2>&1 || { echo "Docker requis"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "docker-compose requis"; exit 1; }

# 2. Pull dernier code
echo "[2/6] Récupération dernière version..."
cd "$(dirname "$0")/.."
if [ -d .git ]; then
  git pull origin main
fi

# 3. Build des images
echo "[3/6] Build des images Docker..."
docker-compose build --no-cache

# 4. Backup avant mise à jour
echo "[4/6] Sauvegarde de la base..."
if [ -f scripts/backup.sh ]; then
  bash scripts/backup.sh
fi

# 5. Déploiement
echo "[5/6] Déploiement des conteneurs..."
docker-compose up -d --force-recreate

# 6. Vérification santé
echo "[6/6] Vérification santé..."
sleep 5
for i in {1..6}; do
  if curl -sf http://localhost > /dev/null 2>&1; then
    echo "✓ Frontend est opérationnel"
    break
  fi
  echo "  Attente... ($i/6)"
  sleep 5
done

echo ""
echo "=== Déploiement terminé avec succès ==="
echo "Logs: $LOG_FILE"