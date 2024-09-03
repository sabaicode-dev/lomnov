FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install && npm install -g nodemon

COPY ./src ./src
COPY tsconfig.json nodemon.json tsoa.json ./

CMD ["npm", "run", "dev"]
