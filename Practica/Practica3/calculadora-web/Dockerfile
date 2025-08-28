# Usa una imagen base oficial de Node
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["node", "server.js"]
