import { CalendarDaysIcon, TagIcon } from '@heroicons/react/24/outline';

interface PropertyDetailsSectionProps {
  year: number;
  codeInternal: string;
}

export function PropertyDetailsSection({
  year,
  codeInternal,
}: PropertyDetailsSectionProps) {
  return (
    <div>
      <h2 className="font-heading text-text-primary mb-4 text-xl font-semibold">
        Details
      </h2>
      <div className="flex flex-wrap gap-x-4 gap-y-3 text-sm md:text-base">
        <div className="text-text-muted flex min-w-[calc(50%-0.5rem)] items-center md:min-w-[calc(33.333%-0.67rem)]">
          <CalendarDaysIcon className="text-primary mr-2 h-5 w-5" />
          <span>Year Built: {year}</span>
        </div>
        <div className="text-text-muted flex min-w-[calc(50%-0.5rem)] items-center md:min-w-[calc(33.333%-0.67rem)]">
          <TagIcon className="text-primary mr-2 h-5 w-5" />
          <span>Ref Code: {codeInternal}</span>
        </div>
      </div>
    </div>
  );
}
