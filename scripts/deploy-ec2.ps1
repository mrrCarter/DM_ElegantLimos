param(
    [Parameter(Mandatory = $true)]
    [string]$HostName,

    [Parameter(Mandatory = $true)]
    [string]$KeyPath,

    [string]$RemoteUser = "ubuntu",

    [string]$ReleaseLabel = (Get-Date -Format "yyyyMMddHHmmss")
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$tmpDir = Join-Path $projectRoot "infra\tmp"
$packagePath = Join-Path $tmpDir "dm-elegant-limos-$ReleaseLabel.tgz"
$clientEnvPath = Join-Path $tmpDir "client-$ReleaseLabel.env"
$serverEnvPath = Join-Path $tmpDir "server-$ReleaseLabel.env"

foreach ($requiredPath in @($clientEnvPath, $serverEnvPath)) {
    if (-not (Test-Path $requiredPath)) {
        throw "Missing deployment env file: $requiredPath"
    }
}

New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null
Push-Location $projectRoot
try {
    git archive --format=tar.gz --output=$packagePath HEAD
} finally {
    Pop-Location
}

$remoteTarget = "$RemoteUser@$HostName"

scp -i $KeyPath $packagePath "$remoteTarget`:~/app-release.tgz"
scp -i $KeyPath (Join-Path $projectRoot "infra\ec2\bootstrap.sh") "$remoteTarget`:~/bootstrap.sh"
scp -i $KeyPath $clientEnvPath "$remoteTarget`:~/.env.production"
scp -i $KeyPath $serverEnvPath "$remoteTarget`:~/.env"

ssh -i $KeyPath $remoteTarget "chmod +x ~/bootstrap.sh && ~/bootstrap.sh"
ssh -i $KeyPath $remoteTarget "mkdir -p /var/www/dm-elegant-limos/shared && cp ~/.env /var/www/dm-elegant-limos/shared/.env && cp ~/.env.production /var/www/dm-elegant-limos/shared/.env.production"
ssh -i $KeyPath $remoteTarget "tar -tzf ~/app-release.tgz >/dev/null"
ssh -i $KeyPath $remoteTarget "bash -lc 'cd /tmp && rm -rf dm-elegant-limos-release && mkdir dm-elegant-limos-release && tar -xzf ~/app-release.tgz -C dm-elegant-limos-release && chmod +x dm-elegant-limos-release/infra/ec2/release.sh && APP_ROOT=/var/www/dm-elegant-limos RUNTIME_USER=$RemoteUser dm-elegant-limos-release/infra/ec2/release.sh $ReleaseLabel ~/app-release.tgz'"
