@echo off
set /p repo_url="Paste your GitHub Repository URL here (e.g., https://github.com/yourname/jansevak.git): "

echo.
echo Initializing Git...
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote remove origin
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Done! Now go to Render.com and select this repository.
pause
