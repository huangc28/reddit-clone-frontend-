import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Threads from './containers/Threads'
import CreateThread from './containers/CreateThread'

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Threads} />
    <Route path="/home" component={Threads} />
    <Route path="/create" component={CreateThread} />
  </Route>
)
