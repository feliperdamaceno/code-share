import type { Category } from '@code-share/shared/types/ecomm'

export class CategoryRequest {
  static async getAllCategories(): Promise<[Category[], null] | [null, Error]> {
    try {
      const response = await fetch('/api/categories', { method: 'GET' })
      const json = (await response.json()) as { data: Category[] }
      return [json.data, null]
    } catch (error) {
      if (error instanceof Error) {
        return [null, error]
      }
      throw error
    }
  }
}
