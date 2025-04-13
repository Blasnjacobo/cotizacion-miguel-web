export const formatterCurrency = (value: number | string, options?: Intl.NumberFormatOptions): string =>
  typeof value === 'string'
    ? value
    : value.toLocaleString('en-US', { style: 'currency', currency: 'USD', ...options }).slice(1);
