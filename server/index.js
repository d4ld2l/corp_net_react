import fs from 'fs'
import path from 'path'
import express from 'express'
import proxy from 'http-proxy-middleware'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import compression from 'compression'
import env from 'node-env-file'
import webpack from 'webpack'
import favicon from 'serve-favicon'
import css from './routes/css'
import routes from './routes/routes'
import authRoute from './routes/auth'
import loginRouter from './routes/login'
import intranetRouter from './routes/intranet'
import checkToken from './middlewares/checkToken'
import checkLogin from './middlewares/checkLogin'
import checkPageToken from './middlewares/checkPageToken'
import webpackConfig from '../webpack.config.babel'

const envFile = path.join(__dirname, '../.env')

if (fs.existsSync(envFile)) {
  // parse .env file
  env(envFile)

  env.lines.variables.map(e => {
    const splitString = e.split('=')

    console.log(`==> ${splitString[0]}=${splitString[1]}`)
  })
}

const app = express()
const compiler = webpack(webpackConfig)
const serialize = obj => {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }
  return str.join('&')
}

// Logging
app.use(require('morgan')('dev'))

app.use(compression())
app.use(cookieParser())
app.use('/auth', bodyParser.json({ limit: '50mb' }))
app.use('/auth', bodyParser.urlencoded({ extended: true }))
app.use(favicon(path.join(__dirname, '../public', 'faviconV2.ico')))

app.use('/auth', authRoute)
app.use('/login', checkLogin, loginRouter)
// app.use('/intranet', checkToken, intranetRouter)

// Внимание! При использовании body-parser с http-proxy-middleware не работают put/post запросы (кроме multipart/form-data)
//
app.use(
  '/api',
  checkToken,
  proxy({
    target: process.env.API_HOST,
    changeOrigin: true,
    pathRewrite: {'^/api' : ''},
    onProxyReq(proxyReq, req, res) {
      const { token, client, uid, email } = req.credentials
      // proxyReq.setHeader('content-type', 'application/json; charset=utf-8')
      proxyReq.setHeader('access-token', token)
      proxyReq.setHeader('accept', 'application/json')
      proxyReq.setHeader('client', client)
      proxyReq.setHeader('uid', uid)
      proxyReq.setHeader('email', email)
    }
  })
)

app.use(
  '/uploads',
  checkToken,
  proxy({
    target: process.env.UPLOADS_HOST,
    changeOrigin: true
  })
)

app.use(
  '/intranet/assets',
  checkToken,
  proxy({
    target: process.env.ASSETS_HOST,
    changeOrigin: true,
    pathRewrite: {'^/intranet' : ''},
  })
)

app.use(
  '/assets',
  checkToken,
  proxy({
    target: process.env.ASSETS_HOST,
    changeOrigin: true
  })
)

if (process.env.ENABLE_STORYBOOK === 'true') {
  app.use('/static', express.static(path.resolve('storybook_build/static')))
  app.get('/storybook', (req, res) => {
    res.sendFile(path.resolve('storybook_build/index.html'))
  })
  app.get('/iframe.html', (req, res) => {
    res.sendFile(path.resolve('storybook_build/iframe.html'))
  })
}

app.use('/dist/css/style.css', css)
console.log('NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'local') {

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  )

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  )
}

app.use('/dist', express.static(path.join(__dirname, '../dist')))
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/', checkPageToken, routes)

const port = process.env.NODE_PORT

app.listen(port, error => {
  if (error) throw error

  console.log(`==> Listen ${port} port. Open http://localhost:${port}/ in your browser.`)
})
