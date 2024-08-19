& $PSScriptRoot/setup.ps1
Clear-Host

Set-Location "$PSScriptRoot/.."

Start-Process "mods/backend/.venv/Scripts/python.exe" `
    -ArgumentList "api_service.py" `
    -WorkingDirectory "mods/backend"

& npm run dev