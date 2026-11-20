'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Images,
  Briefcase,
  Clock,
  ArrowRight,
  Plus,
  ExternalLink,
  Sparkles,
  PhoneCall,
  Loader2,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Booking, Service, GalleryItem } from '@/lib/types/database';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [servicesCount, setServicesCount] = useState<number>(0);
  const [galleryCount, setGalleryCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [bookingsRes, servicesRes, galleryRes] = await Promise.all([
          fetch('/api/admin/bookings'),
          fetch('/api/admin/services'),
          fetch('/api/admin/gallery'),
        ]);

        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          if (Array.isArray(data)) setBookings(data);
        }
        if (servicesRes.ok) {
          const data = await servicesRes.json();
          if (Array.isArray(data)) setServicesCount(data.length);
        }
        if (galleryRes.ok) {
          const data = await galleryRes.json();
          if (Array.isArray(data)) setGalleryCount(data.length);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const totalBookings = bookings.length;
  const newBookings = bookings.filter((b) => b.status === 'new').length;
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8 pb-10">
      <AdminHeader title="Dashboard Overview" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarCheck}
          label="Total Bookings"
          value={isLoading ? '...' : totalBookings}
        />
        <StatCard
          icon={Clock}
          label="New Inquiries"
          value={isLoading ? '...' : newBookings}
          trend={newBookings > 0 ? { value: `${newBookings} awaiting response`, positive: true } : undefined}
        />
        <StatCard
          icon={Briefcase}
          label="Active Services"
          value={isLoading ? '...' : servicesCount}
        />
        <StatCard
          icon={Images}
          label="Gallery Images"
          value={isLoading ? '...' : galleryCount}
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
        <h2 className="text-base font-semibold tracking-tight font-heading mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/admin/gallery">
              <Plus className="h-4 w-4" /> Add Gallery Photo
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/admin/services">
              <Plus className="h-4 w-4" /> Manage Services
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/admin/pricing">
              <Plus className="h-4 w-4" /> Edit Pricing
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/admin/settings">
              Edit Site Settings
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2 ml-auto">
            <Link href="/" target="_blank">
              <ExternalLink className="h-4 w-4" /> View Public Site
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight font-heading">
              Recent Inquiries & Bookings
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Client requests submitted through the website or WhatsApp
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
            <Link href="/admin/bookings">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading bookings...
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No booking inquiries yet. Inquiries submitted on the site will appear here.
          </div>
        ) : (
          <>
            {/* Mobile Cards View (< sm) */}
            <div className="divide-y divide-border/40 sm:hidden">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 space-y-3 bg-card hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">{booking.client_name}</h3>
                      <p className="text-xs text-muted-foreground">{booking.service}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/30">
                    <span>Date: {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'Flexible'}</span>
                    {booking.client_phone && (
                      <a
                        href={`https://wa.me/${booking.client_phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 font-medium hover:bg-green-500/20 active:scale-95 transition-all touch-manipulation"
                      >
                        <PhoneCall className="h-3 w-3" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>= sm) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase border-b border-border/60">
                  <tr>
                    <th className="px-6 py-3">Client</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {booking.client_name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {booking.client_phone}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {booking.service}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'Flexible'}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {booking.client_phone && (
                          <a
                            href={`https://wa.me/${booking.client_phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                          >
                            <PhoneCall className="h-3 w-3" /> WhatsApp
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
