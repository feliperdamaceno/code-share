import type { Product } from '@code-share/shared/types/product'

export class ProductRequest {
  static async getAllProducts(): Promise<[Product[], null] | [null, Error]> {
    try {
      const response = await fetch('/api/products', { method: 'GET' })
      const json = (await response.json()) as { data: Product[] }
      return [json.data, null]
    } catch (error) {
      if (error instanceof Error) {
        return [null, error]
      }
      throw error
    }
  }

  static async getProductBySlug(
    slug: string
  ): Promise<[Product, null] | [null, Error]> {
    try {
      const response = await fetch(`/api/products/${slug}`, { method: 'GET' })
      const json = (await response.json()) as { data: Product }
      return [json.data, null]
    } catch (error) {
      if (error instanceof Error) {
        return [null, error]
      }
      throw error
    }
  }
}
