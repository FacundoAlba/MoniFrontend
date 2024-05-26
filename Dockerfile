FROM node:20.10.0

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /app

COPY package.json /app/package.json

COPY next.config.mjs /app/next.config.mjs

RUN npm install