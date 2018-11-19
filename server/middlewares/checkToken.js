import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect('/login')
    return next({ status: 403 })
  }

  try {
    const credentials = jwt.verify(req.cookies.token, process.env.NODE_SECRET)

    delete credentials.iat

    req.credentials = credentials
    next()
  } catch (e) {
    console.log(e.message)
    res.clearCookie('token')
    return next({
      status: 403,
      message: e.message,
    })
  }
}
