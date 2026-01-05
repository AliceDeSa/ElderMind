@echo off
TITLE ElderMind Finance - Ambiente de Desenvolvimento
echo ==========================================
echo   Iniciando ElderMind Finance (Modo Dev)
echo ==========================================
echo.
cd finance-app
echo Iniciando o servidor... O navegador deve abrir automaticamente.
echo.
echo Mantenha esta janela aberta enquanto trabalha.
echo Para parar, feche esta janela ou pressione Ctrl+C.
echo.
npm run dev -- --open
pause
