'use client';

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ icon: Icon, label, value, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-5 shadow-soft transition-all duration-200 hover:shadow-elevated',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              trend.positive
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-red-500/10 text-red-600'
            )}
          >
            {trend.positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.value}
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight font-heading">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
