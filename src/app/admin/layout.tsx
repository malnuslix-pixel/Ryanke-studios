'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebarDesktop } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <AdminSidebarDesktop />

      {/* Main content area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
