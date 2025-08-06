import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/api', (ctx) => {
  return ctx.text('Hello API!')
})

serve(
  {
    fetch: app.fetch,
    port: 5000
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
