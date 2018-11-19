import { Router } from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { matchPath, StaticRouter } from 'react-router-dom'
import { LOCATION_CHANGE } from 'react-router-redux'
import createStaticHistory from '../../src/config/createStaticHistory'
import render from '../../src/config/render'
import routes from '../../src/config/routes'
import configureStore from '../../src/redux/store'
import NotFoundContainer from '../../src/containers/NoFoundContainer'

const router = Router()

router.get('*', (req, res) => {
  const { originalUrl: url } = req
  const context = {}
  const match = routes.reduce((acc, route) => {
    return matchPath(req.url, route.path, { exact: true }) || acc
  }, null)

  if (!match) {
    res.status(404).send(render(<NotFoundContainer />, {}))
    return
  }

  const history = createStaticHistory(url)

  const store = configureStore(
    {
      user: {
        isAuthenticated: true,
        id: req.credentials.id,
        email: req.credentials.email,
        rocket_chat_client_id: req.credentials.rocket_chat_client_id,
        rocket_chat_token: req.credentials.rocket_chat_token,
        rocket_chat_url: process.env.ROCKETCHAT_URL || '',
      },
    },
    history
  )

  store.dispatch({
    type: LOCATION_CHANGE,
    payload: history.location,
  })

  res.status(200).send(
    render(
      <Provider store={store}>
        <StaticRouter location={url} context={context} />
      </Provider>,
      store.getState()
    )
  )
})

export default router
