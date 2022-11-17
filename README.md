# Base Server
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

This is a template repository which will be used as basis for creating new API servers

## Template Features
- Frameworks
  - ExpressJS
  - Jest
- Database
  - Postgres
- ORM
  - TypeORM
- Logging
  - Winston
- Linter
  - TSLint

## Docker

To use the service as a docker container, install [Docker](https://www.docker.com/) and execute the following:
```bash
$ docker-compose up --build -d
```

To confirm if the container exists, enter `docker ps` from the terminal

## Commands
```
$ npm run lint
```
Starts TSLint

```
$ npm run start:debug
```
Starts the application in development mode

```
$ npm run start
```
Starts the application in production mode

## Development References
**Jest**
- [https://jestjs.io/](https://jestjs.io/)

**TypeORM**
- [https://typeorm.io/](https://typeorm.io/)
