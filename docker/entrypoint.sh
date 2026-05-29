#!/bin/sh
set -e

echo "==> Applying database schema..."
npx prisma db push --skip-generate

if [ "${SEED_DATABASE:-true}" = "true" ]; then
  echo "==> Seeding database..."
  node prisma/seed.bundle.cjs
fi

echo "==> Starting Next.js on 0.0.0.0:${PORT:-3000}..."
exec node server.js
