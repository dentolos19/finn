& $PSScriptRoot/setup.ps1
Clear-Host

Start-Process "$PSScriptRoot/../src-backend/.venv/Scripts/python.exe" `
    -ArgumentList "api_service.py" `
    -WorkingDirectory "$PSScriptRoot/../src-backend"

Set-Location "$PSScriptRoot/.."

& pnpm run dev