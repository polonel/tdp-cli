@ECHO OFF

SETLOCAL

SET "NODE_ENV=%~dp0\node.exe"
IF NOT EXIST "%NODE_ENV%" (
    SET "NODE_EXE=node"
)

SET "TDP_CLI_JS=%~dp0\node_modules\tdp\bin\tdp-cli.js"
REM FOR /f "delims=" %%F IN ('CALL "%NODE_EXE%" "%TDP_CLI_JS%" prefix -g') DO (
REM     SET "TDP_PREFIX_TDP_CLI_JS=%%F\node_modules\tdp\bin\tdp-cli.js"
REM )

IF EXIST "%TDP_PREFIX_TDP_CLI_JS%" (
    SET "TDP_CLI_JS=%TDP_PREFIX_TDP_CLI_JS%"
)

IF EXIST "%~dp0\tdp-cli.js" (
    SET "TDP_CLI_JS=%~dp0\tdp-cli.js"
)

"%NODE_EXE%" "%TDP_CLI_JS%" %*