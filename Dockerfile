FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node


FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run format

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:18-alpine as production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

ENV PORT port
ENV DATABASE_HOST host
ENV DATABASE_NAME name
ENV DATABASE_USER user
ENV DATABASE_PASSWORD password
ENV DATABASE_SCHEMA schema
ENV DATABASE_PORT port

# EXPOSE $PORT

CMD [ "node", "dist/main.js" ]



