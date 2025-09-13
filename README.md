# NestJS Starter Kit

This is a starter kit for NestJS projects. It includes the following:

- [x] A `README.md` file with a description of the project and how to run it
- [x] Scalable folder structure
- [x] Linter and prettier
- [x] Authentification with JWT.
- [x] Auth guard for routes
- [x] Database setup (postgres)
- [x] Swagger documentation available at `/api`
- [x] Test setup
- [x] docker compose file for development & production
- [x] TypeOrm

## Installation

```bash
$ npm install
```

Copy the `.env.example` file to `.env` and fill in the values.

## Running the app for development

```bash
# start the database
$ docker-compose up -d

# start the app in development mode
$ npm run start:dev
```

## Deploying the app

Copy the `.env.prod.example` file to `.env.prod` and fill in the values.

Uncomment the `nestjs-app` service, change .env to .env.prod for databaes service in docker-compose.yml and run the following command:

!!! danger Make sure that you have wrote the migrations for the database otherwise the app will not have the correct tables

```bash
# run docker build
$ docker-compose up -d --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
