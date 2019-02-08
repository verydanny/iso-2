import express from 'express'
import { _root } from '../../env'
import { renderer } from './middleware/renderer'

const _prod = process.env.NODE_ENV === 'production'

if (_prod) {
  const app = express()

  app.get('/', renderer())

  app.listen(3000, () => console.log('Listening on port 3000'))
}

export { renderer }
