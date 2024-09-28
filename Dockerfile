FROM node:lts AS build

ENV ADAPTER_NODE=true
ARG SENTRY_ORG
ENV SENTRY_ORG=$SENTRY_ORG
ARG SENTRY_PROJECT
ENV SENTRY_PROJECT=$SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

RUN apt-get update; apt-get full-upgrade -y; apt-get install -y openjdk-17-jre-headless
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN || echo $SENTRY_AUTH_TOKEN) npm run build
RUN npm ci --omit=dev


FROM node:lts-slim AS run

RUN apt-get update; apt-get full-upgrade -y; apt-get install -y git
WORKDIR /app

COPY --from=build /app /app
RUN git fetch --unshallow || echo "Nothing to do"

EXPOSE 3000
USER nobody
CMD ["npm", "start"]
