## Description

NavegamLOG2 API repository application.

## Installation

```bash
$ npm install
```

## Environment Variables

A `.env` file must be created in the root folder following the variables described [here](.env.example).

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running database migration and applying seeds

```bash
$ npx prisma migrate dev
$ npx prisma db seed
```

## Running the app using Docker

```bash
$ docker compose up --build -d
```

### Running database migration and applying seeds

```bash
$ docker exec -it inventory-api npx prisma migrate dev
$ docker exec -it inventory-api npx prisma db seed
```

## API docs

Swagger generated API specification can be found at <http:localhost:3000/api> after running the app.
 

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
