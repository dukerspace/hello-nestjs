FROM node:16.17 AS builder
ENV TZ=Asia/Bangkok
WORKDIR /app
COPY package*.json ./
COPY . ./
COPY .env.dev ./.env
RUN npm install && npm run build --clean

FROM node:16.17 as production
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
