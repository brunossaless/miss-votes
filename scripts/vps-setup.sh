#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/brunossaless/miss-votes.git}"
APP_DIR="${APP_DIR:-/opt/miss-votes}"

echo "==> Instalando dependências..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git curl ca-certificates openssl ufw

echo "==> Instalando Docker..."
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

echo "==> Clonando ou atualizando repositório..."
if [ -d "$APP_DIR/.git" ]; then
  git -C "$APP_DIR" pull --ff-only
else
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"

echo "==> Configurando .env..."
if [ ! -f .env ]; then
  POSTGRES_PASSWORD="$(openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32)"
  cat > .env <<EOF
POSTGRES_USER=missvotes
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=missvotes
APP_PORT=3000
SEED_DATABASE=true
EOF
  echo ""
  echo "Arquivo .env criado. Guarde a senha do banco:"
  grep POSTGRES_PASSWORD .env
  echo ""
else
  echo "Usando .env existente."
fi

echo "==> Subindo aplicação (build pode levar alguns minutos)..."
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

echo "==> Configurando firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable || true

PUBLIC_IP="$(curl -fsSL --max-time 5 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"

echo ""
echo "Deploy concluído."
echo "Acesse: http://${PUBLIC_IP}"
echo ""
echo "Comandos úteis:"
echo "  cd ${APP_DIR} && docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f"
echo "  cd ${APP_DIR} && docker compose -f docker-compose.yml -f docker-compose.prod.yml ps"
