#!/bin/bash

echo
echo "DOWN"
echo "===="

. ./utils/export-uids.sh

ENV_FILE="./deployment/${DEPLOYMENT}/.env"
DEFAULT_ENV_FILE="./deployment/default/.env"
. ./utils/load-env.sh

SECRETS_ENC_FILE="./deployment/${DEPLOYMENT}/secrets.enc.env"
. ./utils/load-secrets-enc-env.sh

VERSIONS_ENV_FILE="./deployment/${DEPLOYMENT}/versions.env"
. ./utils/load-versions-env.sh

export DEPLOYMENT_PREFIX="${DEPLOYMENT_PREFIX:-main}"
DEPLOYMENT_NAME="${DEPLOYMENT_PREFIX}-${DEPLOYMENT//./-}"

export ABS_PROJECT_DIR=$(realpath ${DATA_DIR_PREFIX}${DEPLOYMENT_NAME})

ls -la ${ABS_PROJECT_DIR}

docker compose --project-name "${DEPLOYMENT_NAME}" -f ./docker-compose.yml down && wait $!

if [ -n "$REMOVE_ALL_DATA" ]; then
    [ -d "${ABS_PROJECT_DIR}/postgresql" ] && sudo rm -rf ${ABS_PROJECT_DIR}/postgresql
fi

ls -la ${ABS_PROJECT_DIR}
