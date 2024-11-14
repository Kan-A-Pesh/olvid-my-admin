#!/bin/bash
set -e
cd $(dirname $0)

OLVID_ADMIN_CLIENT_KEY=supersecretkey docker compose up -d
OLVID_ADMIN_CLIENT_KEY=supersecretkey olvid-cli
