## Purpose

Implementing a server side rendering app with **React** + **Redux** + **Express** + **Webpack**.

## Server Side Rendering

1. server is responsible for rendering initial html

2. serve *js bundle* as public, leave the rendering to frontend.

### backend + frontend

spins up both backend server and frontend server.

## Progress

[x] setup webpack compilation environment.

  - [x] babel-loader for es6.

  - [x] es6 preset, transform ES6 script into browser compatible ES5 script.

  - [x] babel stage-0, this [link](http://babeljs.io/docs/plugins/preset-stage-0/) demonstrates what **stage-0** serves.

[x] add koa router.

  - [x] [koa-router](npm install koa-router) repo.

  - [x] [koa-cors](https://github.com/evert0n/koa-cors) repo.

[x] ORM package.

  - [x] Compare **Sequelize** with **Bookshelf**.

  - [x] will choose [bookshelf](http://bookshelfjs.org/) over **Sequelize**. install it!

[x] add frontend script.

[x] ~~add **webpack-dev-server**.~~ [deprecated](https://medium.com/@dan_abramov/the-death-of-react-hot-loader-765fa791d7c4#.bzedf437z) by Dan Abramov

  - [x] install **webpack-dev-server**.

  - [x] configure webpack configuration.

  - [] add script `npm run start:dev` to start **webpack-dev-server** for front end.

[x] add **react router**.

[x] add **redux**.

  - [x] install **redux**

  - [x] install **react-redux**

  - [x] install **react-thunk**

[x] add **mocha** test framework.

  - [x] install **mocha**.

  - [x] install **chai**.

  - [x] install **chai-immutable**.

  - [] React testing framework **jsdom** [link](https://github.com/tmpvar/jsdom).

[x] change framework from **KOA** to **express**.

[x] split configuration depend on environment. use *webpack merge*.

[x] add *hot module reload*.

[x] add **react hot loader** for development environment.

[x] add react router.

[x] polyfill promises for webpack2.

[x] use `ava` for test framework.

[x] add `eslint`

[x] add `asset-require-hook` to load various image mimeTypes from server side.

[x] serve static assets.

[] add *karma* + *enzyme* for testing react components.


## Probably best way to shrink the bundle size at its max using commonChunksPlugin!

I read through [surviveJS](http://survivejs.com/) for extracting *vendor.js*. The article suggest to put all the *frontend modules* under `dependencies` such as react, redux, redux-saga...etc in `package.json` and bundles them up using *commonChunksPlugin*:

```
plugins: [
  new commonChunksPlugin ({
    name: vendor,
    filename: vendor.js,
  })
]
```

However, this reveals a problem that it does not extract out the common chunks among those *frontend modules*. Thus, they might use common chunks that don't get extract out. This results in bigger bundle size. To avoid this, we can use follow settings:

```
entry: [
  join(__dirname, 'src', 'index.js')
]
...
plugins: [
  new commonChunksPlugin ({
    name: vendor,
    filename: vendor.js,
    minChunks: module => {
      module.resource &&
      module.resource.indexOf('node_modules') !== -1 &&
      module.resource.indexOf('.css') === -1
    }
  })
]

```

the above config will load every modules that are actually being `imported` start from the `index.js` and generate a common module amongst them all.

## Generator Pattern

ES6 generator pattern helps to control the flow of javascript async execution sequence. Please Consider the following code.

```
const testGen = function * () {
  const obj = {value: 'from inside'}
  const returned = yield obj
  console.log('returned value', returned) // debugger 3
}

const a = testGen()
const aNext = a.next()
console.log(aNext.value) // debugger 1
console.log(aNext.done) // debugger 2
console.log(a.next('from outside'))
```
1.
  When testGen executes `const returned = yield obj`, it hands over the control outside of the function scope.

2.
  The value yield inside of **testGen** function will be passed on to **aNext.value**. Thus,  **debugger 1** will output `{done: false, value: {value: 'from inside'}}`. **debugger 2** will output `false`

3.
  When execute the **next** `a.next('from outside')`, the execution flow will again be passed into `testGen` function. Thus, **debugger 3** will output `{value: 'from outside', done: true}`

## How to serve static file in express ?

[document](http://expressjs.com/en/starter/static-files.html)

## How to retrieve request object ?

```
app.use(function * () {
  console.log(this.request)
})
app.listen(8086)
```

## How to server KOA backend with es6 ?

spins **KOA** with [babel-node](https://babeljs.io/docs/usage/cli/).

## Production Build

Instead of using **babel node** on production(not suggested), we should prebuild production server script and host with **node** command.

```
npm run build
```

```
npm run server
```

## Webpack dev server

Before spinning up **webpack-dev-server** please install by prompting:

```
npm install -g webpack webpack-dev-server
```

## Host frontend / backend scripts

`webpack-dev-server` hosts frontend script in `localhost:8080`

## problems

### KOA needs 'babel-polyfill' !!

when building server side code with **koa** implemented, it needs **babel-polyfill** to accommodate es6 **promise** / **await async**.

### webpack dev middleware

search the purpose of:

```
hot: true
historyApiFallback: true
```

## References

1. [babel node server example](https://github.com/babel/example-node-server)

2. [react + react-router + redux + koa example](http://blog.joanboixados.com/building-a-boilerplate-for-a-koa-redux-react-application-including-webpack-mocha-and-sass/)

3. [about source map](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)

4. [build isomorphic redux application with love](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.g32xaoksy)

5. [surviveJS](http://survivejs.com/)
