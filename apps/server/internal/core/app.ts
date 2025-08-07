import type { AddressInfo } from 'node:net'
import type { AppConfig } from '../types/config.types.js'
import type { RouterInstance } from '../types/core.types.js'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { loadConfig } from './config.js'
import { loadRoutes } from './routes.js'

class App {
  router: RouterInstance
  config: AppConfig

  constructor() {
    this.router = new Hono()

    loadRoutes(this.router)

    const [config, error] = loadConfig(this.router)
    if (error) {
      console.error(error)
      process.exit(1)
    }
    this.config = config
  }

  start() {
    const server = serve(
      {
        fetch: this.config.router.fetch,
        port: this.config.port
      },
      (info: AddressInfo) => {
        console.log(`Server is running on http://localhost:${info.port}`)
      }
    )

    process.on('SIGINT', () => {
      server.close()
      process.exit(0)
    })

    process.on('SIGTERM', () => {
      server.close((err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        process.exit(0)
      })
    })
  }
}

export type AppInstance = InstanceType<typeof App>
export const app = new App()
