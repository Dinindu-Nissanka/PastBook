# PastBook API

This application manages users photo grid

## How to

### Prerequisites

node version >= v12.14.0

### Installation

- Install [mongodb](https://docs.mongodb.com/manual/installation/) in the server and make sure it is up and running

- Use the node package manager [npm](https://www.npmjs.com/) to run the application.

  ```bash
  npm install

  npm run start
  ```

### Test

- Use the node package manager [npm](https://www.npmjs.com/) to run the unit tests.

  ```bash
  npm run test
  ```

### Check and Fix linting issues

- Check what are the linting issues by running below command

```bash
  npm run lint
```

- Fix those issues by

```bash
  npm run lint-fix
```

### Usage

#### Please note

- All the api endpoints required authorization header which includes a bearer token
- The bearer token can be generated from the /auth/login endpoint.
- New users can be created from the /auth/signup

API documentation can be found from [/api-docs](http://localhost:3333/api-docs) endpoint

### Docker container

- Use the node package manager [npm](https://www.npmjs.com/) to run the backend as a docker container. This would create a mongodb docker image and a backend application docker image. Then would run one instance from each docker image.

```bash
  npm run docker:up
```
