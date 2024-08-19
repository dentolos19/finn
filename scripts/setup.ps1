Set-Location "$PSScriptRoot/.."

if (-not (Test-Path "mods/ffmpeg")) {

    Write-Host "Downloading FFmpeg..."

    Invoke-WebRequest `
        -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" `
        -OutFile "mods/ffmpeg.zip"

    Expand-Archive `
        -Path "mods/ffmpeg.zip" `
        -DestinationPath "mods"

    Rename-Item `
        -Path "mods/ffmpeg-master-latest-win64-gpl" `
        -NewName "ffmpeg"

    Remove-Item `
        -Path "mods/ffmpeg.zip"

}

Write-Host "Installing dependencies for frontend..."
Write-Host

& pnpm install
Write-Host

Set-Location "$PSScriptRoot/../mods/backend"

Write-Host "Installing dependencies for backend..."
Write-Host

if (-not (Test-Path ".venv")) {
    & py -m venv ".venv"
}
& .venv/Scripts/Activate.ps1
& pip install -r requirements.txt