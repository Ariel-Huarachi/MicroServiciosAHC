# Usa una imagen base oficial
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
