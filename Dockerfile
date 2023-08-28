# Builder
FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install \
&& yarn build

EXPOSE 4000

CMD [ "yarn", "dev:docker2" ]

# Final
# FROM node:18-alpine AS final
# WORKDIR /usr/src/app
# COPY --from=builder .dist
# COPY package.json .
# COPY yarn.lock .

# RUN yarn install --production

# CMD [ "yarn", "dev:docker" ]

