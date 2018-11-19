import reduxCSS from 'redux-css'

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
  } = common

  const configureStore = (initialState = {}, history) => {
    const getComposeEnhancers = history => {
      const composeFunc = applyMiddleware(epicMiddleware, thunk, auth, routerMiddleware(history))

      // in client
      if (process.env.BROWSER) {
        const initialStyles = {
          customBgVar: '#000',
        }

        const styleReducer = (vars = initialStyles, action, state) => {
          switch (action.type) {
            default:
              return vars
          }
        }

        const { middleware: cssMiddleware, ...css } = reduxCSS(styleReducer)

        return {
          css,
          enchantedFunctions: compose(
            applyMiddleware(cssMiddleware, epicMiddleware, thunk, auth, routerMiddleware(history))
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
            ),
          }
        }
      }
      // return in safari
      return { enchantedFunctions: compose(composeFunc) }
    }

    const { enchantedFunctions, css = {} } = getComposeEnhancers(history)
    // Add the reducer to your store on the `router` key
    // Also apply our middleware for navigating
    const store = createStore(rootReducer, initialState, enchantedFunctions)

    if (process.env.BROWSER) window.dcss = css
    epicMiddleware.run(rootEpic)
    return store
  }

  return configureStore
}
