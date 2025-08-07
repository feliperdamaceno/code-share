import type { Hono } from 'hono'
import type { BlankSchema } from 'hono/types'

interface RouterEnv {
  Bindings: undefined
  Variables: undefined
}

export type RouterInstance = Hono<RouterEnv, BlankSchema, '/'>
