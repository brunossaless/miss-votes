#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push --skip-generate

if [ "${SEED_DATABASE:-true}" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed
fi

echo "Starting application..."
exec node server.js
