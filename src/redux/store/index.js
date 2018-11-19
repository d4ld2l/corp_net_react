import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import { webSocket } from 'rxjs/webSocket'
import rootReducer from '../reducers'
import rootEpic from '../epics'
import { auth } from '../middlewares/auth'
import styleReducer from '../reducers/styleReducer'

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    webSocket,
  },
})

const commonModules = {
  rootReducer,
  thunk,
  routerMiddleware,
  createStore,
  applyMiddleware,
  compose,
  auth,
  epicMiddleware,
  rootEpic,
  styleReducer,
}

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')(commonModules)
} else {
  module.exports = require('./configureStore.dev')(commonModules)
}
