import { Button } from '@/components/ui/Button';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FilterPopover } from './FilterPopover';

interface FilterButtonProps {
  onApply: (value: any) => void;
  onClear: () => void;
  initialValue: any;
  label: string;
  children: React.ReactElement<{
    setTemporaryValue: (value: any) => void;
    initialValue?: any;
  }>;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  onApply,
  onClear,
  initialValue,
  label,
  children,
}) => {
  return (
    <FilterPopover
      onApply={onApply}
      onClear={onClear}
      initialValue={initialValue}
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
