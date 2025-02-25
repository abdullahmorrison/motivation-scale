FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --quiet

COPY . .

CMD ["npm", "run", "dev"]
