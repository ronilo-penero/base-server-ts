FROM node:16.14.2

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

RUN npm install

COPY . .

RUN apt update && \
    apt install -y shared-mime-info libpq-dev libsqlite3-dev dumb-init

CMD ["dumb-init", "tsc", "node", "dist/index.js"]
