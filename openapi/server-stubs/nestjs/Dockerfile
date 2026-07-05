FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

RUN npm install --production

EXPOSE 3000
CMD ["node", "dist/main.js"]
