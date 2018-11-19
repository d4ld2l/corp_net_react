import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`/login?origin=${encodeURIComponent(req.originalUrl)}`)
    return
  }

  try {
    const credentials = jwt.verify(req.cookies.token, process.env.NODE_SECRET)

    delete credentials.iat

    req.credentials = credentials
    next()
  } catch (e) {
    console.log(e.message)
    res.redirect('/login')
  }
}
