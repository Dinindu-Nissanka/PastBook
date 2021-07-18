FROM node:14-alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

COPY src /usr/app/src
COPY public /usr/app/public
COPY tsconfig.json /usr/app/tsconfig.json

EXPOSE 3000

CMD ["npm", "run", "start"]