<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.com/channels/jeanbaptisteniyikiza_48814" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## SETUP A NESTJS PROJECT

```bash
# clone repo

$ npm i -g @nestjs/cli
$ nest new project-name
$ cd project-name

# install the required dependencies

$ npm i --save @nestjs/config
$ npm install --save @nestjs/typeorm typeorm pg 
$ npm i @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
$ npm i @nestjs/swagger swagger-ui-express
$ npm i class-validator class-transformer uuid
$ npm i -D @types/uuid

# create user,tasks and auth modules
$ nest g module users
$ nest g controller users
$ nest g service users
---------------------
$ nest g module tasks
$ nest g controller tasks
$ nest g service tasks
------------------------
$ nest g module auth
$ nest g controller auth
$ nest g service auth

# create entity insntaces and dtos
$ nest g class users/user.entity --no-spec
$ nest g class tasks/task.entity --no-spec

-----------------------------
$ nest g class users/dto/create-user.dto --no-spec
$ nest g class tasks/dto/create-task.dto --no-spec
$ nest g class tasks/dto/update-task.dto --no-spec

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/jb_niyikiza) and [LinkedIn](https://www.linkedin.com/in/niyikiza-jean-baptiste2025/).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [jean Baptiste Niyikiza](https:/personal-portifolio-git-main-niyikizas-projects.vercel.app/)
- Website - [https://jbniyikiza](https:/personal-portifolio-git-main-niyikizas-projects.vercel.app/)
- LinkedIn - [@keep in touch](https://www.linkedin.com/in/niyikiza-jean-baptiste2025/)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).





# Users & Tasks API (NestJS)

A RESTful API built with **NestJS**, **TypeORM**, and **PostgreSQL** that manages users, tasks, and authentication with JWT. Includes Swagger documentation.

---

## 🚀 Features
- User CRUD (create, list, get by id, delete)
- Task CRUD (create, list, update status, delete)
- One-to-Many relation (User ↔ Tasks)
- DTOs & Validation with `class-validator`
- Authentication (Signup/Login with JWT)
- UUIDv4 for IDs
- Swagger API documentation

---

## 🛠️ Tech Stack
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Swagger (OpenAPI)

---

## 📦 Installation

```bash
# clone repo
git clone https://github.com/Solvit-Africa-Training-Center/users-tasks-api.git
cd users-tasks-api

# install dependencies
npm install

# 
