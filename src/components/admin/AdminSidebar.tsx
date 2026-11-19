'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Image,
  User,
  Briefcase,
  Images,
  MessageSquareQuote,
  CreditCard,
  Award,
  CalendarCheck,
  ExternalLink,
  LogOut,
  Menu,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Hero', href: '/admin/hero', icon: Image },
  { label: 'About', href: '/admin/about', icon: User },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Pricing', href: '/admin/pricing', icon: CreditCard },
  { label: 'Brands', href: '/admin/brands', icon: Award },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Camera className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-tight font-heading">
            Ryankey Studios
          </h2>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks onNavigate={onNavigate} />
      </div>

      {/* Footer */}
      <div className="mt-auto border-t px-3 py-4 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          Back to Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

/** Desktop sidebar — always visible at lg+ */
export function AdminSidebarDesktop() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-card">
      <SidebarContent />
    </aside>
  );
}

/** Mobile sidebar — triggered by hamburger in AdminHeader */
export function AdminSidebarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
