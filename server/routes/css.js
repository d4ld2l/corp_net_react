import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.set('Content-Type', 'text/css').send('')
})

export default router
