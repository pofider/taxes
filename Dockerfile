FROM node:alpine
EXPOSE 1000

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .
CMD [ "node", "index.js" ]