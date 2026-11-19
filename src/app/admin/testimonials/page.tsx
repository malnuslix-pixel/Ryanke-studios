'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  MessageSquareQuote,
  Star,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Testimonial } from '@/lib/types/database';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setTestimonials(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      name: '',
      role: '',
      content: '',
      rating: 5,
      avatar_url: null,
      sort_order: testimonials.length + 1,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.content) {
      toast.error('Name and review content are required');
      return;
    }
    setIsSaving(true);

    try {
      const isEdit = !!editingItem.id;
      const url = '/api/admin/testimonials';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save testimonial');
      }

      toast.success(isEdit ? 'Testimonial updated!' : 'Testimonial added!');
      setIsDialogOpen(false);
      loadTestimonials();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving testimonial');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }

      toast.success('Testimonial deleted');
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting testimonial');
    }
  };

  const handleToggleActive = async (item: Testimonial) => {
    try {
      const newStatus = !item.is_active;
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_active: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, is_active: newStatus } : t))
      );
      toast.success(`Review ${newStatus ? 'published' : 'hidden'}`);
    } catch (err) {
      toast.error('Could not update review status');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader title="Client Testimonials" />
        <Button onClick={handleOpenAdd} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <MessageSquareQuote className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-medium">No testimonials yet</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Add glowing client reviews to build social proof on the website.
          </p>
          <Button onClick={handleOpenAdd} size="sm">
            Add First Review
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border p-5 transition-all shadow-sm flex flex-col justify-between ${
                item.is_active
                  ? 'border-border/60 bg-card'
                  : 'border-border/40 bg-muted/20 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < (item.rating || 5) ? 'fill-amber-400' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors ${
                      item.is_active
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {item.is_active ? 'Active' : 'Hidden'}
                  </button>
                </div>

                <p className="text-xs italic text-foreground/90 line-clamp-4 mb-4">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="border-t border-border/40 pt-3">
                  <h4 className="text-sm font-semibold font-heading text-foreground">
                    {item.name}
                  </h4>
                  {item.role && (
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border/40 pt-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(item)}
                  className="h-8 gap-1 text-xs"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingItem?.id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
          </DialogHeader>

          {editingItem && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Client Name</Label>
                  <Input
                    id="name"
                    value={editingItem.name || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    placeholder="e.g. Grace Wanjiku"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="role">Role / Company</Label>
                  <Input
                    id="role"
                    value={editingItem.role || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, role: e.target.value })
                    }
                    placeholder="e.g. Corporate Client"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="rating">Rating (Stars)</Label>
                  <select
                    id="rating"
                    value={editingItem.rating || 5}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        rating: parseInt(e.target.value) || 5,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sort_order">Display Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={editingItem.sort_order || 1}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        sort_order: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="content">Review Quote</Label>
                <Textarea
                  id="content"
                  value={editingItem.content || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, content: e.target.value })
                  }
                  placeholder="What the client said about Ryankey Studios..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label>Client Photo / Avatar (Optional)</Label>
                <ImageUploader
                  currentImageUrl={editingItem.avatar_url}
                  onUpload={(url) => setEditingItem({ ...editingItem, avatar_url: url })}
                  label="Upload Client Photo"
                  folder="testimonials"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingItem.is_active ?? true}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, is_active: e.target.checked })
                  }
                  className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Display this testimonial on the website
                </Label>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Testimonial
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
