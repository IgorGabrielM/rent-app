FROM node:18.13.0-alpine AS deps

WORKDIR /usr/app

COPY rent-app-client/package*.json .

RUN npm ci --omit-dev

FROM node:18.13.0-alpine AS builder

WORKDIR /usr/app

COPY --from=deps /usr/app/node_modules ./node_modules
COPY rent-app-client/ .

RUN npm run build

FROM nginx:1.23.3-alpine

WORKDIR /var/www/rent-app

COPY infra/docker/nginx/prod/client.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist .

EXPOSE 80
