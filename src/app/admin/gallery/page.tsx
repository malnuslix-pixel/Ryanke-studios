'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Images,
  Star,
  Eye,
  EyeOff,
  Filter,
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
import { GalleryItem } from '@/lib/types/database';

const CATEGORIES = [
  'All',
  'Corporate',
  'Events',
  'Family',
  'Brands',
  'Portraits',
  'Creative',
  'Lifestyle',
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);

  const loadGallery = async () => {
    try {
      const res = await fetch('/api/admin/gallery');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load gallery items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      description: '',
      image_url: '',
      category: selectedCategory === 'All' ? 'Portraits' : selectedCategory,
      is_featured: false,
      is_active: true,
      sort_order: items.length + 1,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.image_url) {
      toast.error('Title and image are required');
      return;
    }
    setIsSaving(true);

    try {
      const isEdit = !!editingItem.id;
      const url = '/api/admin/gallery';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save image');
      }

      toast.success(isEdit ? 'Gallery image updated!' : 'Image added to gallery!');
      setIsDialogOpen(false);
      loadGallery();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving gallery image');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete item');
      }

      toast.success('Image removed from gallery');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting image');
    }
  };

  const handleToggleFeatured = async (item: GalleryItem) => {
    try {
      const newFeatured = !item.is_featured;
      const res = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_featured: newFeatured }),
      });

      if (!res.ok) throw new Error('Failed to update featured flag');

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_featured: newFeatured } : i))
      );
      toast.success(newFeatured ? 'Marked as featured' : 'Removed from featured');
    } catch (err) {
      toast.error('Could not update featured status');
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader title="Gallery Manager" />
        <Button onClick={handleOpenAdd} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Plus className="h-4 w-4" /> Add Photo to Gallery
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/40 pb-4">
        <Filter className="h-4 w-4 text-muted-foreground mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {cat}
            {cat === 'All' ? ` (${items.length})` : ''}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <Images className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-medium">No gallery items in this category</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Upload high-resolution photography to build your portfolio.
          </p>
          <Button onClick={handleOpenAdd} size="sm">
            Upload Image
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm hover:border-accent/40 transition-all"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                {/* Image */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlays / Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                  {item.is_featured && (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-medium text-black">
                      <Star className="h-2.5 w-2.5 fill-black" /> Featured
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleFeatured(item)}
                  title="Toggle Featured"
                  className={`absolute top-2 right-2 rounded-full p-1.5 backdrop-blur-md transition-colors ${
                    item.is_featured
                      ? 'bg-amber-400 text-black'
                      : 'bg-black/50 text-white/70 hover:text-white'
                  }`}
                >
                  <Star className={`h-3.5 w-3.5 ${item.is_featured ? 'fill-black' : ''}`} />
                </button>
              </div>

              <div className="p-3 flex items-center justify-between gap-2 border-t border-border/40">
                <div className="overflow-hidden">
                  <h4 className="text-xs font-semibold truncate text-foreground">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingItem?.id ? 'Edit Gallery Photo' : 'Upload New Photo'}
            </DialogTitle>
          </DialogHeader>

          {editingItem && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Photo File</Label>
                <ImageUploader
                  currentImageUrl={editingItem.image_url}
                  onUpload={(url) => setEditingItem({ ...editingItem, image_url: url })}
                  label="Upload High-Res Photo"
                  folder="gallery"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Photo Title</Label>
                <Input
                  id="title"
                  value={editingItem.title || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  placeholder="e.g. Editorial Fashion Shoot"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={editingItem.category || 'Portraits'}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
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
                <Label htmlFor="description">Caption / Notes (Optional)</Label>
                <Textarea
                  id="description"
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Behind the scenes details, client, or equipment used..."
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={editingItem.is_featured ?? false}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_featured: e.target.checked })
                    }
                    className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer text-xs">
                    Feature on Homepage 3D Carousel
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editingItem.is_active ?? true}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_active: e.target.checked })
                    }
                    className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                  />
                  <Label htmlFor="is_active" className="cursor-pointer text-xs">
                    Visible in Gallery
                  </Label>
                </div>
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
                  Save Photo
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
