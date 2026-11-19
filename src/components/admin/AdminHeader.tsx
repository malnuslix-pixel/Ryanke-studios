'use client';

import { useEffect, useState } from 'react';
import { AdminSidebarMobile } from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu trigger */}
        <AdminSidebarMobile />

        {/* Page title */}
        <h1 className="text-lg font-semibold tracking-tight font-heading lg:text-xl">
          {title}
        </h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User info */}
        <div className="flex items-center gap-3">
          {userEmail && (
            <span className="hidden text-sm text-muted-foreground sm:inline-block max-w-[200px] truncate">
              {userEmail}
            </span>
          )}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
