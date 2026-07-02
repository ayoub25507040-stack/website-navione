@echo off
cd /d "%~dp0"

set PY=
where python >nul 2>nul && set PY=python
if "%PY%"=="" if exist "C:\PySchool\3.10-32-bit\python.exe" set PY=C:\PySchool\3.10-32-bit\python.exe
if "%PY%"=="" where py >nul 2>nul && set PY=py

if "%PY%"=="" (
  echo Python n'a pas ete trouve sur cet ordinateur.
  echo Installez Python depuis https://www.python.org/downloads/ puis relancez ce fichier.
  pause
  exit /b 1
)

echo Demarrage de NAVIONE sur http://localhost:8080
"%PY%" server.py

pause
