#!/bin/bash

. ./deployment/down.sh

echo
echo "UP"
echo "=="

. ./utils/export-uids.sh

ENV_FILE="./deployment/${DEPLOYMENT}/.env"
DEFAULT_ENV_FILE="./deployment/default/.env"
. ./utils/load-env.sh

SECRETS_ENC_FILE="./deployment/${DEPLOYMENT}/secrets.enc.env"
. ./utils/load-secrets-enc-env.sh

VERSIONS_ENV_FILE="./deployment/${DEPLOYMENT}/versions.env"
. ./utils/load-versions-env.sh


export DEPLOYMENT_PREFIX="${DEPLOYMENT_PREFIX:-main}"

# replace dots with dashes for docker compose project name
DEPLOYMENT_NAME="${DEPLOYMENT_PREFIX}-${DEPLOYMENT//./-}"

export ABS_PROJECT_DIR=$(realpath ${DATA_DIR_PREFIX}${DEPLOYMENT_NAME})
[ ! -d "${ABS_PROJECT_DIR}/postgresql" ] && mkdir -p "${ABS_PROJECT_DIR}/postgresql"

ls -la $ABS_PROJECT_DIR

docker compose --project-name "${DEPLOYMENT_NAME}" -f ./docker-compose.yml pull && wait $!

# Force rebuild if requested
if [ "${FORCE_REBUILD}" = "true" ]; then
  echo "Force rebuilding images (--no-cache)..."
  docker compose --project-name "${DEPLOYMENT_NAME}" -f ./docker-compose.yml build --no-cache
fi

docker compose --project-name "${DEPLOYMENT_NAME}" -f ./docker-compose.yml up -d

ls -la $ABS_PROJECT_DIR

