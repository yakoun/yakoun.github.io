#!/bin/bash
# Script de sauvegarde automatique
# Configurez une tâche cron : 0 2 * * * /path/to/scripts/backup.sh

set -euo pipefail

BACKUP_DIR="/backups/portfolio"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

echo "[Backup] Début - $(date)"

# 1. Backup Supabase (optionnel — utiliser pg_dump ou Supabase CLI)
# Supabase CLI: supabase db dump --linked > "$BACKUP_DIR/supabase_${DATE}.sql"
echo "[Backup] Les données sont sur Supabase — utiliser le dashboard pour l'export"

# 2. Nettoyage des backups > RETENTION_DAYS jours
echo "[Backup] Nettoyage des backups de plus de $RETENTION_DAYS jours..."
find "$BACKUP_DIR" -name "*.sql" -type f -mtime +$RETENTION_DAYS -delete

echo "[Backup] Terminé - $(date)"