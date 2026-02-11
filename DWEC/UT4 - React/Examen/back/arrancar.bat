@echo off
setlocal

REM Move to the script directory so relative paths work.
cd /d "%~dp0"

REM Ensure virtual environment exists.
if not exist ".venv\Scripts\activate.bat" (
  python -m venv .venv
)

REM Activate virtual environment.
call ".venv\Scripts\activate.bat"

REM Run the server.
python -m uvicorn app.main:app --reload
