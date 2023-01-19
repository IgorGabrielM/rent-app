FROM node:18.13.0-alpine

WORKDIR /usr/app

COPY rent-app-client/package*.json .

RUN npm ci

COPY rent-app-client/ .

ENV NODE_ENV development

EXPOSE 4200

CMD [ "npm", "start" ]
