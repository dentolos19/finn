Set-Location -Path $PSScriptRoot

if (-not (Test-Path "mods/ffmpeg")) {

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

& pnpm install

Set-Location -Path "mods/backend"

& py -m venv .venv
& .venv/Scripts/Activate.ps1
& pip install -r requirements.txt