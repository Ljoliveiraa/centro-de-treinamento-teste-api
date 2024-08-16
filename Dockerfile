FROM node:lts-alpine3.10 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma migrate dev
RUN npm link webpack
RUN npm run build

FROM node:lts-alpine3.10 AS production
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]
