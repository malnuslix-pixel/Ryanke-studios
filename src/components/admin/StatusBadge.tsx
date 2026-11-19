'use client';

import { cn } from '@/lib/utils';

type BookingStatus = 'new' | 'confirmed' | 'completed' | 'cancelled';

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  new: {
    label: 'New',
    className: 'bg-blue-500/10 text-blue-700 border-blue-200',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-amber-500/10 text-amber-700 border-amber-200',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-500/10 text-red-700 border-red-200',
  },
};

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize',
        config.className,
        className
      )}
    >
      <span
        className={cn(
          'mr-1.5 inline-block h-1.5 w-1.5 rounded-full',
          status === 'new' && 'bg-blue-500',
          status === 'confirmed' && 'bg-amber-500',
          status === 'completed' && 'bg-emerald-500',
          status === 'cancelled' && 'bg-red-500'
        )}
      />
      {config.label}
    </span>
  );
}
