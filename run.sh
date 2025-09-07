#!/bin/bash
set -e  # se algum comando falhar, o script para imediatamente

# 1 - Compila o projeto
echo ">>> Rodando mvn clean package..."
mvn clean package

# 2 - Copia o JAR gerado para a raiz do projeto
JAR_NAME="frontend-mvsds-0.0.1-SNAPSHOT.jar"
TARGET_DIR="./target"
ROOT_DIR="."

if [ -f "$TARGET_DIR/$JAR_NAME" ]; then
  echo ">>> Copiando $JAR_NAME para a raiz..."
  cp -f "$TARGET_DIR/$JAR_NAME" "$ROOT_DIR/"
else
  echo "!!! Erro: Arquivo $TARGET_DIR/$JAR_NAME não encontrado."
  exit 1
fi

# 3 - Executa com authbind
echo ">>> Iniciando aplicação com authbind..."
authbind --deep java -jar "$ROOT_DIR/$JAR_NAME"
