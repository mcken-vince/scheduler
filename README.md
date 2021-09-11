# Interview Scheduler
Project to practice working with React, leveraging more complex hooks and manipulating state. 
- Components were largely built in isolation using Storybook.
- Tests are written using Jest and Cypress.
- Server requests are made with Axios.
- Used CircleCI
- Production branch auto-deployed on Netlify, with server deployed on Heroku

### Deployed App Link:
### https://613cf31a731b490008edef51--boring-villani-f82285.netlify.app/
Server is deployed on a free Heroku account, so will need a minute to boot up after request is made.
Give it a few seconds and refresh until data loads.

!["Scheduler demo GIF"](https://github.com/mcken-vince/scheduler/blob/master/resources/Scheduler-demo.gif)


## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Dev-Dependencies
- storybook
- babel-loader
- cypress
- node-sass
- prop-types
- react-hooks-testing-library
- react-test-renderer
- @babel/core
- @testing-library/jest-dom
- @testing-library/react

## Make sure you are using Node v10.16.1, this app is not compatible with newer versions
```
$ nvm install v10.16.1
$ nvm use v10.16.1
```

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress tests
- must first have test database server up and running
- scheduler server must also be running

```sh
npm run cypress
```