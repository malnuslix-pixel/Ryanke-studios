'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  CalendarCheck,
  Search,
  PhoneCall,
  Trash2,
  Eye,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Booking } from '@/lib/types/database';

const STATUS_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [isUpdatingNote, setIsUpdatingNote] = useState(false);

  const loadBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setBookings(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Booking['status']) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      toast.success(`Booking status marked ${newStatus}`);
    } catch (err) {
      toast.error('Could not update booking status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedBooking) return;
    setIsUpdatingNote(true);

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedBooking.id, notes: adminNote }),
      });

      if (!res.ok) throw new Error('Failed to save notes');

      setBookings((prev) =>
        prev.map((b) => (b.id === selectedBooking.id ? { ...b, notes: adminNote } : b))
      );
      setSelectedBooking((prev) => (prev ? { ...prev, notes: adminNote } : null));
      toast.success('Notes saved');
    } catch (err) {
      toast.error('Error saving notes');
    } finally {
      setIsUpdatingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking record?')) return;

    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete booking');

      toast.success('Booking deleted');
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
    } catch (err) {
      toast.error('Error deleting booking');
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setAdminNote(booking.notes || '');
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === 'all' || (b.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      (b.client_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.client_phone || '').includes(search) ||
      (b.service || '').toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      <AdminHeader title="Bookings & Inquiries" />

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                statusFilter === tab.value
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.value === 'all'
                ? ` (${bookings.length})`
                : ` (${bookings.filter((b) => b.status === tab.value).length})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone..."
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <CalendarCheck className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-medium">No bookings found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {search || statusFilter !== 'all'
              ? 'Try adjusting your search query or status filter.'
              : 'Client inquiries will appear here when submitted on the website.'}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs font-medium text-muted-foreground uppercase border-b border-border/60">
                <tr>
                  <th className="px-6 py-3.5">Client</th>
                  <th className="px-6 py-3.5">Phone</th>
                  <th className="px-6 py-3.5">Service Requested</th>
                  <th className="px-6 py-3.5">Date / Duration</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date Received</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {b.client_name}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>{b.client_phone}</span>
                        {b.client_phone && (
                          <a
                            href={`https://wa.me/${b.client_phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-500 hover:text-emerald-400"
                            title="Chat on WhatsApp"
                          >
                            <PhoneCall className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/80">
                      {b.service}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      <div>
                        {b.preferred_date
                          ? new Date(b.preferred_date).toLocaleDateString()
                          : 'Flexible'}
                      </div>
                      {b.duration && (
                        <div className="text-[11px] text-muted-foreground/80">
                          {b.duration}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={b.status}
                        onChange={(e) =>
                          handleUpdateStatus(b.id, e.target.value as Booking['status'])
                        }
                        className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="new">New</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(b)}
                          className="h-8 gap-1 text-xs"
                        >
                          <Eye className="h-3.5 w-3.5" /> Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(b.id)}
                          className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        {selectedBooking && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading flex items-center justify-between">
                <span>Inquiry Details</span>
                <StatusBadge status={selectedBooking.status} />
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-2 text-sm">
              <div className="grid grid-cols-2 gap-3 border-b border-border/40 pb-3">
                <div>
                  <span className="text-xs text-muted-foreground">Client Name</span>
                  <p className="font-medium">{selectedBooking.client_name}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Phone Number</span>
                  <div className="flex items-center gap-1 font-medium">
                    <span>{selectedBooking.client_phone}</span>
                    <a
                      href={`https://wa.me/${selectedBooking.client_phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-500 hover:text-emerald-400 ml-1"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Service</span>
                  <p className="font-medium">{selectedBooking.service}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Preferred Date</span>
                  <p className="font-medium">
                    {selectedBooking.preferred_date
                      ? new Date(selectedBooking.preferred_date).toLocaleDateString()
                      : 'Flexible'}
                  </p>
                </div>
              </div>

              {selectedBooking.details && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Client Request / Message</span>
                  <p className="rounded-lg bg-muted/40 p-3 text-xs leading-relaxed">
                    {selectedBooking.details}
                  </p>
                </div>
              )}

              {/* Status Switcher in Dialog */}
              <div className="space-y-1.5">
                <Label htmlFor="dialog_status">Change Status</Label>
                <select
                  id="dialog_status"
                  value={selectedBooking.status}
                  onChange={(e) =>
                    handleUpdateStatus(selectedBooking.id, e.target.value as Booking['status'])
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="new">New</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="admin_notes">Internal Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Deposit paid, studio booked, camera gear ready..."
                  rows={3}
                />
                <div className="flex justify-end pt-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleSaveNotes}
                    disabled={isUpdatingNote}
                    className="text-xs"
                  >
                    {isUpdatingNote && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                asChild
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
              >
                <a
                  href={`https://wa.me/${selectedBooking.client_phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                    selectedBooking.client_name
                  )},%20thank%20you%20for%20contacting%20Ryankey%20Studios%20regarding%20${encodeURIComponent(
                    selectedBooking.service || 'your booking'
                  )}.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PhoneCall className="h-4 w-4" /> Message on WhatsApp
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
