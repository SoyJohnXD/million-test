export interface PriceFilterValue {
  min: number | null;
  max: number | null;
}

export interface PriceFilterProps {
  initialValue?: PriceFilterValue;
  setTemporaryValue: (value: PriceFilterValue) => void;
}

export interface CounterFilterProps {
  initialValue?: number | null;
  setTemporaryValue: (value: number | null) => void;
  label?: string;
  options?: number[];
  showAny?: boolean;
  suffix?: string;
}

export interface FilterPopoverProps<T = unknown> {
  trigger: React.ReactElement<{
    onClick?: () => void;
    'aria-expanded'?: boolean;
    'aria-haspopup'?: string;
  }>;
  children: (args: {
    setTemporaryValue: (value: T) => void;
    initialValue?: T;
  }) => React.ReactNode;
  onApply: (value: T) => void;
  onClear?: () => void;
  initialValue?: T;
}

export interface FilterButtonProps<T> {
  onApply: (value: T) => void;
  onClear: () => void;
  initialValue?: T;
  label: string;
  children: (args: {
    setTemporaryValue: (value: T) => void;
    initialValue?: T;
  }) => React.ReactNode;
}

export interface Filters {
  price: PriceFilterValue | null;
  bedrooms: number | null;
  bathrooms: number | null;
  year: number | null;
  sqm: number | null;
  address?: string | null;
}

export interface UseFilterParams {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  clearFilter: (key: keyof Filters) => void;
  clearAllFilters: () => void;
}
