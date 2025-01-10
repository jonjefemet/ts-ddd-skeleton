# Usar la imagen base más reciente de Node.js 20 LTS
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm
