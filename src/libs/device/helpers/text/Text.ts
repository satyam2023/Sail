export const numberFormat = (value: any, locale = "en-GB", options: any = {}) =>
  new Intl.NumberFormat(locale, options).format(value);
