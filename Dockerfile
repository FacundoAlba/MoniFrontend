FROM node:20

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .

COPY next.config.mjs .

RUN yarn build

CMD ["yarn", "start"]