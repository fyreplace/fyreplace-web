FROM node:lts AS build

ENV NODE_ADAPTER true
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build
RUN npm ci --omit=dev


FROM node:lts-slim AS run

COPY --from=build /app /app
WORKDIR /app

EXPOSE 3000
CMD ["npm", "start"]
