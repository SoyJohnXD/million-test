import { Button } from '@/components/ui/Button';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FilterPopover } from './FilterPopover';
import { FilterButtonProps } from '../../types/filters';

export const FilterButton = <T,>({
  onApply,
  onClear,
  initialValue,
  label,
  children,
}: FilterButtonProps<T>) => {
  return (
    <FilterPopover
      onApply={onApply}
      onClear={onClear}
      initialValue={initialValue ?? undefined}
      trigger={
        <Button
          variant={initialValue ? 'primary' : 'outline'}
          size="sm"
          className="flex items-center gap-1 rounded-full"
        >
          <span>{label}</span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      }
    >
      {children}
    </FilterPopover>
  );
};
