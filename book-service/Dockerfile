# Utilisation d'une image de base Node.js
FROM node:16

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (si existant)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste de l'application
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application
CMD ["node", "app.js"]
