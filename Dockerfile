FROM node:lts AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build
RUN npm ci --omit=dev


FROM node:lts-slim AS run

RUN apt-get update; apt-get install -y git
WORKDIR /app

COPY --from=build /app /app
RUN git fetch --unshallow || echo "Nothing to do"

EXPOSE 3000
CMD npm start
