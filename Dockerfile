FROM node:12 as builder

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN yarn build

CMD ["yarn", "start"]
