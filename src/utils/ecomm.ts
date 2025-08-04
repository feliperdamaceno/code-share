type Locale = 'en-US' | 'en-GB'

type Currency = 'USD' | 'EUR'

type Options = {
  locale?: Locale
  currency?: Currency
  value?: number
}

export function formatPrice({
  locale = 'en-GB',
  currency = 'EUR',
  value = 0
}: Options) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })

  return formatter.format(value)
}
