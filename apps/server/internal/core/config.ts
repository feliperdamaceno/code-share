import type { AppConfig } from '../types/config.types.js'
import type { RouterInstance } from '../types/core.types.js'

const isProduction = process.env.NODE_ENV === 'production'

export function loadConfig(
  router: RouterInstance
): [Readonly<AppConfig>, null] | [null, Error] {
  try {
    const config: AppConfig = {
      router,
      port: isProduction ? Number(process.env.PORT) : 5000
    } as const

    return [config, null]
  } catch (error) {
    if (error instanceof Error) return [null, error]
    throw error
  }
}
