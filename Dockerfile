FROM node:16-alpine

#RUN apk add g++ make py3-pip

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./server/server.js" ]
