import axios from 'axios'
import env from 'node-env-file'

env(`${__dirname}/../../.env`)

export default axios.create({
  baseURL: 'http://hr.dev.shr.phoenixit.ru',
  headers: {
    Cookie: `token=${process.env.TOKEN}`,
  },
})
