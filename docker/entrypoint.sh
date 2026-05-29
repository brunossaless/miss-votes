#!/bin/sh
set -e

echo "==> Generating Prisma client..."
npx prisma generate

echo "==> Applying database schema..."
npx prisma db push

if [ "${SEED_DATABASE:-true}" = "true" ]; then
  echo "==> Seeding database..."
  node ./node_modules/tsx/dist/cli.mjs prisma/seed.ts
fi

echo "==> Starting Next.js on 0.0.0.0:${PORT:-3000}..."
exec node server.js
