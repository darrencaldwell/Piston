FROM node

WORKDIR /app

RUN npm install -g nodemon
RUN npm install -g ts-node-dev

COPY package*.json ./

RUN npm ci && npm cache clean --force && mv /app/node_modules /node_modules

COPY . .

ENV PORT 21450

EXPOSE 21450

CMD ["node", "cards.js"]
