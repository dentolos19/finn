@echo off
call .venv/Scripts/activate.bat
python api_service.py
pause >nul
exit