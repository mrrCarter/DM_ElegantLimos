#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg nginx git build-essential

if ! command -v node >/dev/null 2>&1 || [ "$(node -v | sed 's/v//' | cut -d. -f1)" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

sudo mkdir -p /var/www/dm-elegant-limos/releases /var/www/dm-elegant-limos/shared
sudo chown -R "$USER:$USER" /var/www/dm-elegant-limos
sudo systemctl enable nginx
