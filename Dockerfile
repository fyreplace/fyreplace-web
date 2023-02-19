FROM node:lts

WORKDIR /app
ENV NODE_ADAPTER true

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
