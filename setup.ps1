Set-Location $PSScriptRoot

if (-not (Test-Path "src/mods/ffmpeg")) {
    Write-Host "Downloading FFmpeg..."

    Invoke-WebRequest `
        -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" `
        -OutFile "src/mods/ffmpeg.zip"

    Expand-Archive `
        -Path "src/mods/ffmpeg.zip" `
        -DestinationPath "src/mods"

    Rename-Item `
        -Path "src/mods/ffmpeg-master-latest-win64-gpl" `
        -NewName "ffmpeg"

    Remove-Item `
        -Path "src/mods/ffmpeg.zip"

    Write-Host "FFmpeg downloaded!"
}
else {
    Write-Host "FFmpeg already exists!"
}
