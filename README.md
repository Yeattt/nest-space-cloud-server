<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## STACK:
- NestJS
- TypeORM
- MySQL
- JOI for .env vars validations
- Docker

## Setup
1. Install the npm dependencies: ```npm i```.
2. Replace .env.template to .env and set the env variables.
3. Setup the database with docker: ```docker compose up -d```.
4. Setup the application: ```npm run start:dev```