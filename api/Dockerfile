FROM node:14-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

COPY src /usr/app/src
COPY types  /usr/app/types
COPY config /usr/app/config
COPY tsconfig.json /usr/app/tsconfig.json

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start-docker"]