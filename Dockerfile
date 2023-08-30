# Builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY . /app

RUN yarn install \
  && yarn build

EXPOSE 3000

CMD [ "yarn", "dev" ]
