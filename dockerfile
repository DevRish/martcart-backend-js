FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./tsconfig.json ./
CMD ["npm", "run", "dev"]
