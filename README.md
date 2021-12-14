## Description

Simple API service that searches available product catalog and returns up to 5 items with applied discounts (if any).

The implementation can be described as `demo` version rather than full production ready.

My goal was to deliver all the required stuff with the least code and effort.

The search function implemented with most the simplest form. 
I was expecting poor performance but after adding test cases for search from 50k products 
it turned out that on my Mac Pro M1 machine it took <3 ms per test (including generation of 50k dataset).
I didn't improve the algorithm as it looked good enough. 

## Installation

Requires [node 14.x or higher](https://nodejs.org) to be installed on machine

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Doc

[Swagger API](http://localhost:3000/docs/) is available at http://localhost:3000/docs/

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
