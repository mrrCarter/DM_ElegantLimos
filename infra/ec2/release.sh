#!/usr/bin/env bash
set -euo pipefail

release_label="${1:?release label is required}"
package_path="${2:?package path is required}"
app_root="${APP_ROOT:-/var/www/dm-elegant-limos}"
runtime_user="${RUNTIME_USER:-ubuntu}"
release_dir="${app_root}/releases/${release_label}"
shared_dir="${app_root}/shared"

test -f "${shared_dir}/.env" || {
  echo "Missing ${shared_dir}/.env"
  exit 1
}

test -f "${shared_dir}/.env.production" || {
  echo "Missing ${shared_dir}/.env.production"
  exit 1
}

rm -rf "${release_dir}"
mkdir -p "${release_dir}"
tar -xzf "${package_path}" -C "${release_dir}"
cp "${shared_dir}/.env" "${release_dir}/.env"
cp "${shared_dir}/.env.production" "${release_dir}/.env.production"
chown -R "${runtime_user}:${runtime_user}" "${release_dir}"

pushd "${release_dir}" >/dev/null
npm ci --ignore-scripts
npm run lint
npm run test
npm run build
popd >/dev/null

sudo cp "${release_dir}/infra/ec2/dm-elegant-limos.service" /etc/systemd/system/dm-elegant-limos.service
sudo cp "${release_dir}/infra/ec2/nginx.conf" /etc/nginx/sites-available/dm-elegant-limos
sudo ln -sfn /etc/nginx/sites-available/dm-elegant-limos /etc/nginx/sites-enabled/dm-elegant-limos
sudo rm -f /etc/nginx/sites-enabled/default

ln -sfn "${release_dir}" "${app_root}/current"

sudo systemctl daemon-reload
sudo systemctl enable dm-elegant-limos
sudo systemctl restart dm-elegant-limos
sudo nginx -t
sudo systemctl reload nginx
