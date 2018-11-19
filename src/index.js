import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { CookiesProvider } from 'react-cookie'
import createBrowserHistory from 'history/createBrowserHistory'
import Root from './Root'
import { appInit, loginInit } from 'redux-folder/actions/appInitActions'
import configureStore from 'redux-folder/store'

const history = createBrowserHistory()
const store = configureStore(window.__INITIAL_STATE__, history)
delete window.__INITIAL_STATE__

const state = store.getState()

if (state.router.location.pathname !== '/login') {
  Promise.all([store.dispatch(appInit())]).then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CookiesProvider>
            <Root />
          </CookiesProvider>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
} else {
  Promise.all([store.dispatch(loginInit())]).then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CookiesProvider>
            <Root />
          </CookiesProvider>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
}
