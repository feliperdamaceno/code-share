type Locale = 'en-US' | 'en-GB'

type Currency = 'USD' | 'EUR'

type PriceOptions = {
  locale?: Locale
  currency?: Currency
  value?: number
}

export function formatPrice({
  locale = 'en-GB',
  currency = 'EUR',
  value = 0
}: PriceOptions) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })

  return formatter.format(value)
}

type DiscountDetails = {
  price: number
  discount: number
}

export function getDiscountAmount({ price, discount }: DiscountDetails) {
  if (discount <= 0) return 0
  return (discount / 100) * price
}
