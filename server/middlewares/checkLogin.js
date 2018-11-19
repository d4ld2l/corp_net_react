import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  try {
    const credentials = jwt.verify(req.cookies.token, process.env.NODE_SECRET)

    res.redirect('/')
  } catch (e) {
    console.log(e.message)
    res.clearCookie('token')
    next()
  }
}
