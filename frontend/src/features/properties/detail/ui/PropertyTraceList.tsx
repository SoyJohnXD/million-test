import { PropertyTrace } from '@/entities/property/model';
import { formatCurrency } from '@/utils/text';

interface PropertyTraceListProps {
  traces: PropertyTrace[];
}

export function PropertyTraceList({ traces }: PropertyTraceListProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(dateString));
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div>
      <h2 className="font-heading text-text-primary mb-3 text-xl font-semibold">
        Property History
      </h2>
      <ul className="space-y-3">
        {traces.map((trace, index) => (
          <li
            key={index}
            className="border-border bg-accent/10 rounded-md border p-3 text-sm"
          >
            <div className="flex justify-between font-medium">
              <span>{trace.name || 'Transaction'}</span>
              <span>{formatDate(trace.dateSale)}</span>
            </div>
            <div className="text-text-muted mt-1 flex justify-between text-xs">
              <span>Value: {formatCurrency(trace.value)}</span>
              <span>Tax: {formatCurrency(trace.tax)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
