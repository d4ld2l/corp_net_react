import { createLogger } from 'redux-logger'
import reduxCSS from 'redux-css'

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

module.exports = common => {
  const {
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
  } = common

  const getComposeEnhancers = history => {
    const composeFunc = applyMiddleware(
      epicMiddleware,
      thunk,
      logger,
      auth,
      routerMiddleware(history)
    )

    // in client
    if (process.env.BROWSER) {

      const { middleware: cssMiddleware, ...css } = reduxCSS(styleReducer)

      return {
        css,
        enchantedFunctions: compose(
          applyMiddleware(
            epicMiddleware,
            cssMiddleware,
            thunk,
            logger,
            auth,
            routerMiddleware(history)
          )
        ),
      }
    }

    // in node server
    if (!process.env.BROWSER) {
      return {
        enchantedFunctions: compose(
          applyMiddleware(epicMiddleware, routerMiddleware(history), thunk)
        ),
      }
    }

    // bug in safari
    // https://github.com/reactjs/redux/issues/2033
    if (process.env.BROWSER && window.navigator.userAgent.includes('Chrome')) {
      if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        return {
          enchantedFunctions: compose(
            composeFunc,
            window.__REDUX_DEVTOOLS_EXTENSION__()
          ),
        }
      }
    }

    // return in safari
    return { enchantedFunctions: compose(composeFunc) }
  }

  const configureStore = (initialState = {}, history) => {
    // Add the reducer to your store on the `router` key
    // Also apply our middleware for navigating
    const { enchantedFunctions, css = {} } = getComposeEnhancers(history)
    const store = createStore(rootReducer, initialState, enchantedFunctions)

    epicMiddleware.run(rootEpic)

    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(require('../reducers').default)
      })
      module.hot.accept('../epics', () => {
        const rootEpic = require('../epics').default
        epicMiddleware.replaceEpic(rootEpic)
      })
    }

    if (process.env.BROWSER) window.dcss = css
    return store
  }

  return configureStore
}
