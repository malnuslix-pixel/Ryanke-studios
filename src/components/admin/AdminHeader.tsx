'use client';

import React, { useEffect, useState } from 'react';
import { AdminSidebarMobile } from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import { User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, action }: AdminHeaderProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data }) => {
        setUserEmail(data.user?.email ?? null);
      });
    } catch (e) {}
  }, []);

  return (
    <header className="sticky top-0 z-30 -mx-3 -mt-3 mb-4 sm:-mx-6 sm:-mt-6 sm:mb-6 lg:-mx-8 lg:mb-8 border-b border-border/60 bg-card/95 backdrop-blur-md transition-all">
      <div className="flex h-14 sm:h-16 items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
        {/* Mobile menu trigger & title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <AdminSidebarMobile />
          <h1 className="text-base sm:text-lg font-bold tracking-tight font-heading lg:text-xl truncate text-foreground">
            {title}
          </h1>
        </div>

        {/* Action Button & User Info */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {action && <div className="shrink-0">{action}</div>}

          {userEmail && (
            <span className="hidden text-xs sm:text-sm text-muted-foreground md:inline-block max-w-[150px] truncate">
              {userEmail}
            </span>
          )}

          <div
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0"
            title={userEmail || 'Admin User'}
          >
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
