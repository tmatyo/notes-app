# Node.js - Express, MongoDB, ES8 REST API Boilerplate

> ⚠️This project template simplifies the initial setup, offering a structured boilerplate for creating web applications. It can save your time and effort in setting up your Node.js, Express, and MongoDB-based projects. Feel free to use it, edit or completly replace it by your own. It is up to you.

![NodeJs Express MongoDB](https://d33wubrfki0l68.cloudfront.net/ee5af837fdabb4d29b35d25748c0072d1816c255/3f3a0/public/assets/images/jxavz9h.png)

## Features

- Uses [npm](https://npmjs.com)
- No transpilers, just vanilla javascript with ES2018 latest features like Async/Await
- Express + MongoDB ([Mongoose](http://mongoosejs.com/))
- CORS enabled and uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
- Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
- Request validation with [joi](https://github.com/hapijs/joi)
- Logging with winston [winston](https://github.com/winstonjs/winston)
- File upload with [multer](https://www.npmjs.com/package/multer)
- Consistent coding styles with [editorconfig](http://editorconfig.org)
- Gzip compression with [compression](https://github.com/expressjs/compression)
- Linting with [eslint](http://eslint.org)
- Tests with [mocha](https://mochajs.org), [chai](http://chaijs.com) and [sinon](http://sinonjs.org)
- Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
- Git hooks with [husky](https://github.com/typicode/husky)
- Logging with [morgan](https://github.com/expressjs/morgan)
- Authentication and Authorization with [passport](http://passportjs.org)
- Rate limiting with [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- API documentation generation with [Apidoc](http://apidocjs.com)
- Monitoring with [pm2](https://github.com/Unitech/pm2)

## Prerequisites

- [Node v10.0+](https://nodejs.org/en/download/current/)

- [npm v6.0+](https://www.npmjs.com)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
npm run dev
```

## Running in Production

```bash
npm run start
```

## Lint

```bash
# lint code with ESLint
npm run lint

# try to fix ESLint errors
npm run lint:fix

# lint and watch for changes
npm run lint:watch
```

## Test

```bash
# run all tests with Mocha
npm run test

# run unit tests
npm run test:unit

# run integration tests
npm run test:integration

# run all tests and watch for changes
npm run test:watch

# open nyc test coverage reports
npm run coverage
```

## Validate

```bash
# run lint and tests
npm run validate
```

## Documentation

```bash
# generate and open api documentation
npm run docs
```

## Rate Limit Configuration

Change configuration in `.env` file
