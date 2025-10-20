import {
  formatCurrency,
  formatShortPrice,
  formatPriceRange,
  concat,
} from '@/utils/text';

describe('utils/text', () => {
  describe('concat', () => {
    it('concatena clases filtrando falsy', () => {
      const result = concat('a', undefined, 'b', false, 'c');
      expect(result).toBe('a b c');
    });
  });
  describe('formatCurrency', () => {
    it('formatea número a moneda por defecto', () => {
      expect(formatCurrency(1234)).toBe('$1,234');
    });

    it('maneja null/undefined devolviendo $0', () => {
      expect(formatCurrency('xyz')).toBe('$0');
    });

    it('respeta locale y currency', () => {
      const val = formatCurrency(1000, { currency: 'EUR', locale: 'de-DE' });
      expect(val).toMatch(/1\.000.*€/);
    });
  });

  describe('formatShortPrice', () => {
    it('usa K para miles', () => {
      expect(formatShortPrice(1000)).toBe('$1K');
    });
    it('usa M para millones', () => {
      expect(formatShortPrice(1500000)).toBe('$1.5M');
    });
    it('valores < 1000 sin sufijo', () => {
      expect(formatShortPrice(999)).toBe('$999');
    });
    it('maneja null/undefined como $0', () => {
      expect(formatShortPrice(null as unknown as number)).toBe('$0');
      expect(formatShortPrice(undefined as unknown as number)).toBe('$0');
    });
  });

  describe('formatPriceRange', () => {
    it('muestra Price si no hay min ni max', () => {
      expect(
        formatPriceRange(null as unknown as number, null as unknown as number)
      ).toBe('Price');
    });
    it('formatea solo min', () => {
      expect(formatPriceRange(1000, null)).toBe('$1K - ∞');
    });
    it('formatea solo max', () => {
      expect(formatPriceRange(null, 2000)).toBe('$0 - $2K');
    });
    it('combina min y max', () => {
      expect(formatPriceRange(1000, 2000)).toBe('$1K - $2K');
    });
  });
});
