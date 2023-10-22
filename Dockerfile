FROM node:18-alpine

WORKDIR /

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["node", "main.js"]


