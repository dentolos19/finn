@echo off
if not exist .venv (
    py -m venv .venv
)
call .venv/Scripts/activate.bat
pip install -r requirements.txt
cls
python api_service.py
pause >nul
exit