import type { Image } from './assets'
import type { Discount, CategoryOption } from './ecomm'

export type Product = {
  id: string
  title: string
  slug: string
  description: string
  categories: CategoryOption[]
  images: Image[]
  author: string
  price: number
  discount: Discount
  available: boolean
  featured: boolean
  createdAt: number
}

export type CatalogProduct = {
  id: string
  title: string
  image: string
  price: number
  discount: Discount
  available: boolean
}

export type CartProduct = {
  id: string
  title: string
  image: string
  price: number
  discount: Discount
  quantity: number
}
