# Builder
FROM node:18 AS builder

WORKDIR /app
COPY . /app

RUN yarn install \
  && yarn build

EXPOSE 3000

CMD [ "yarn", "dev:docker2" ]
