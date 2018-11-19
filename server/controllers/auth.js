import jwt from 'jsonwebtoken'
import axios from 'axios'
import queryString from 'query-string'

export const signin = async (req, res, next) => {
  const { email, password, search } = req.body
  const parsedSearch = queryString.parse(search)
  try {
    const params = {
      email,
      password,
    }
    const sendAuthRequest = await axios.post(`${process.env.API_HOST}auth/sign_in`, params, { headers: {'X-Reactor-Host': req.headers.host} })
    const { data } = sendAuthRequest.data
    const { headers } = sendAuthRequest
    const token = headers['access-token']
    const client = headers.client
    const uid = headers.uid

    data.rocket_chat_url = process.env.ROCKETCHAT_URL || ''

    const jwtToken = jwt.sign(
      {
        ...data,
        token,
        client,
        uid,
      },
      process.env.NODE_SECRET
    )

    res.cookie('token', jwtToken, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    })

    res.json({ token, client, search: parsedSearch, uid, ...data })
  } catch (e) {
    console.log(e, '44')
    return next({
      status: 400,
      message: e.message,
    })
  }
}

export const logout = async (req, res, next) => {
  try {
    const credentials = jwt.verify(req.cookies.token, process.env.NODE_SECRET)

    const headers = {
      'access-token': credentials.token,
      client: credentials.client,
      uid: credentials.uid,
    }

    const sendAuthRequest = await axios.delete(`${process.env.API_HOST}auth/sign_out`, { headers })

    res.clearCookie('token').end()
  } catch (e) {
    console.log(e.message)
    return next({
      status: 400,
      message: e.meesage,
    })
  }
}

export const signup = async (req, res, next) => {
  const credential = req.body

  res.json({})
}

export const generateNewPass = async (req, res, next) => {
  const { email } = req.body

  try {
    const params = {
      email,
    }

    const sendGenerateNewPassAuthRequest = await axios.post(
      `${process.env.API_HOST}accounts/generate_new_password_email`,
      params
    )

    const { data } = sendGenerateNewPassAuthRequest

    res.json({ ...data })
  } catch (e) {
    console.error(e)
    return next({
      status: 400,
      message: e.message,
    })
  }
}

export const resetNewPass = async (req, res, next) => {
  const { password, passConfirmation, token } = req.body

  try {
    const params = {
      password,
      password_confirmation: passConfirmation,
      reset_password_token: token,
    }

    const sendResetNewPassAuthRequest = await axios.post(
      `${process.env.API_HOST}accounts/reset_password`,
      params
    )

    const { data } = sendResetNewPassAuthRequest

    res.json({ ...data })
  } catch (e) {
    console.error(e)
    return next({
      status: 400,
      message: e.message,
    })
  }
}

export const loginSettings = async (req, res, next) => {
  try {
    const loginSettingsRequest = await axios(`${process.env.API_HOST}login_settings`, { headers: {'X-Reactor-Host': req.headers.host} })
    const { data } = loginSettingsRequest
    res.json({ ...data })
  } catch (e) {
    console.error(e.message)
    return next({
      status: 400,
      message: e.message,
    })
  }
}
