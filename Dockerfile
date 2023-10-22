FROM node:18

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run linter

EXPOSE 3000

CMD ["node", "main.js"]


