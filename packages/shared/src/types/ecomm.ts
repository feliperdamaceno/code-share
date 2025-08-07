export type Category = {
  id: string
  name: string
  options: CategoryOption[]
}

export type CategoryOption = {
  id: string
  name: string
}

export type Discount = {
  percentage: number
}

export type Coupon = {
  code: string
  discount: number
}
