FROM node:lts

WORKDIR /app
ENV DOCKER true

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run build
RUN npm ci --omit=dev

COPY . .

CMD ["node", "build"]
