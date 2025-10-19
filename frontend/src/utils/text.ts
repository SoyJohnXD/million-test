export const concat = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(' ');

export const formatCurrency = (
  value: string | number,
  options: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
  } = {}
) => {
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 0,
  } = options;

  try {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return '$0';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits: 2,
    }).format(numericValue);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '$0';
  }
};

export const formatShortPrice = (value: number | null | undefined): string => {
  if (!value) return '$0';

  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

export const formatPriceRange = (
  min: number | null | undefined,
  max: number | null | undefined
): string => {
  if (!min && !max) return 'Price';

  const formattedMin = formatShortPrice(min || 0);
  const formattedMax = max ? formatShortPrice(max) : '∞';

  return `${formattedMin} - ${formattedMax}`;
};
