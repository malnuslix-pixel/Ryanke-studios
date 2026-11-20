'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Film,
  Star,
  Eye,
  EyeOff,
  ExternalLink,
  Play,
  Video,
  Info,
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

export interface DocumentaryItem {
  id: string;
  title: string;
  description: string;
  drive_url: string;
  thumbnail_url: string;
  duration?: string;
  client_or_topic?: string;
  year?: string;
  cta_label?: string;
  is_featured?: boolean;
  is_active: boolean;
  sort_order: number;
}

export default function AdminDocumentariesPage() {
  const [items, setItems] = useState<DocumentaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<DocumentaryItem> | null>(null);

  const loadDocumentaries = async () => {
    try {
      const res = await fetch('/api/admin/documentaries');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load documentaries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocumentaries();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem({
      title: '',
      description: '',
      drive_url: '',
      thumbnail_url: '/gallery/corporate.jpg',
      duration: '15 min',
      client_or_topic: 'Documentary Storytelling',
      year: new Date().getFullYear().toString(),
      cta_label: 'Watch Documentary',
      is_featured: false,
      is_active: true,
      sort_order: items.length + 1,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: DocumentaryItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.drive_url) {
      toast.error('Title and Google Drive video link are required');
      return;
    }
    setIsSaving(true);

    try {
      const isEdit = !!editingItem.id && !editingItem.id.startsWith('default-doc-');
      const url = '/api/admin/documentaries';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...editingItem,
        cta_label: editingItem.cta_label || 'Watch Documentary',
        thumbnail_url: editingItem.thumbnail_url || '/gallery/corporate.jpg',
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save documentary');
      }

      toast.success(isEdit ? 'Documentary updated successfully!' : 'Documentary added successfully!');
      setIsDialogOpen(false);
      loadDocumentaries();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving documentary');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this documentary?')) return;

    try {
      const res = await fetch(`/api/admin/documentaries?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete documentary');
      }

      toast.success('Documentary deleted');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting documentary');
    }
  };

  const handleToggleActive = async (item: DocumentaryItem) => {
    try {
      const newActive = !item.is_active;
      const res = await fetch('/api/admin/documentaries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, is_active: newActive }),
      });

      if (!res.ok) throw new Error('Failed to update active state');

      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_active: newActive } : i))
      );
      toast.success(newActive ? 'Documentary visible on site' : 'Documentary hidden');
    } catch (err) {
      toast.error('Could not update status');
    }
  };

  const handleToggleFeatured = async (item: DocumentaryItem) => {
    try {
      const newFeatured = !item.is_featured;
      const res = await fetch('/api/admin/documentaries', {
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

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader title="Documentaries & Film Showcase" />
        <Button onClick={handleOpenAdd} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Plus className="h-4 w-4" /> Add Documentary Video
        </Button>
      </div>

      {/* Info Callout for Google Drive */}
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 sm:p-5 flex items-start gap-3">
        <Info className="h-5 w-5 text-accent mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm text-foreground/80 space-y-1">
          <p className="font-semibold text-foreground">Google Drive Link Instructions:</p>
          <p>
            Paste your Google Drive shareable video or folder link (e.g. <code className="px-1.5 py-0.5 rounded bg-muted text-accent font-mono text-xs">https://drive.google.com/file/d/VIDEO_ID/view?usp=sharing</code>).
          </p>
          <p className="text-muted-foreground text-xs">
            Tip: In Google Drive, ensure General Access is set to <strong>&ldquo;Anyone with the link&rdquo;</strong> (Viewer) so website visitors can open and stream the video instantly.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 py-16 text-center">
          <Film className="h-12 w-12 text-muted-foreground/60 mb-3" />
          <h3 className="font-heading font-semibold text-lg">No documentaries yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            Add your first Google Drive documentary to feature it on the portfolio and gallery pages.
          </p>
          <Button onClick={handleOpenAdd} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            <Plus className="h-4 w-4" /> Add Documentary
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((doc) => (
            <div
              key={doc.id}
              className={`group flex flex-col justify-between rounded-2xl border bg-card/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                doc.is_active ? 'border-border/60' : 'border-dashed border-muted-foreground/30 opacity-70'
              }`}
            >
              {/* Thumbnail / Header */}
              <div className="relative aspect-video w-full bg-muted overflow-hidden">
                <img
                  src={doc.thumbnail_url || '/gallery/corporate.jpg'}
                  alt={doc.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Duration Badge */}
                {doc.duration && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 backdrop-blur-sm text-white">
                    {doc.duration}
                  </span>
                )}

                {/* Year / Client Badge */}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent text-accent-foreground">
                  {doc.year || '4K Film'}
                </span>

                {/* Title overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-heading font-semibold text-white text-base line-clamp-1">
                    {doc.title}
                  </h4>
                  {doc.client_or_topic && (
                    <p className="text-[11px] text-white/80 line-clamp-1">{doc.client_or_topic}</p>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {doc.description || 'No description provided.'}
                </p>

                {/* Drive Link & CTA Preview */}
                <div className="space-y-1.5 pt-2 border-t border-border/40 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="font-medium text-[11px] uppercase tracking-wider">CTA Button:</span>
                    <span className="font-semibold text-accent">{doc.cta_label || 'Watch Documentary'}</span>
                  </div>
                  <a
                    href={doc.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 truncate max-w-full"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{doc.drive_url}</span>
                  </a>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeatured(doc)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        doc.is_featured
                          ? 'text-amber-500 hover:bg-amber-500/10'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                      title={doc.is_featured ? 'Featured on hero' : 'Mark as featured'}
                    >
                      <Star className={`h-4 w-4 ${doc.is_featured ? 'fill-amber-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(doc)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        doc.is_active
                          ? 'text-green-500 hover:bg-green-500/10'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                      title={doc.is_active ? 'Visible on website' : 'Hidden from website'}
                    >
                      {doc.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-2.5 text-xs gap-1"
                      onClick={() => handleOpenEdit(doc)}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 px-2 text-xs"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingItem?.id ? 'Edit Documentary' : 'Add Google Drive Documentary'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="doc-title" className="text-xs uppercase tracking-wider text-muted-foreground">
                Documentary Title *
              </Label>
              <Input
                id="doc-title"
                placeholder="e.g. Voices of Impact: Grassroots Transformation"
                value={editingItem?.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-drive-url" className="text-xs uppercase tracking-wider text-muted-foreground">
                Google Drive Video Link *
              </Label>
              <Input
                id="doc-drive-url"
                type="url"
                placeholder="https://drive.google.com/file/d/.../view"
                value={editingItem?.drive_url || ''}
                onChange={(e) => setEditingItem({ ...editingItem, drive_url: e.target.value })}
                required
              />
              <p className="text-[11px] text-muted-foreground">
                Shareable link from Google Drive. Ensure permission is set to &ldquo;Anyone with the link can view&rdquo;.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doc-cta" className="text-xs uppercase tracking-wider text-muted-foreground">
                  CTA Button Label
                </Label>
                <Input
                  id="doc-cta"
                  placeholder="e.g. Watch Documentary"
                  value={editingItem?.cta_label || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, cta_label: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-duration" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Runtime / Duration
                </Label>
                <Input
                  id="doc-duration"
                  placeholder="e.g. 18 min"
                  value={editingItem?.duration || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doc-topic" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Topic / Client / Genre
                </Label>
                <Input
                  id="doc-topic"
                  placeholder="e.g. NGO Community Storytelling"
                  value={editingItem?.client_or_topic || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, client_or_topic: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-year" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Release Year
                </Label>
                <Input
                  id="doc-year"
                  placeholder="2025"
                  value={editingItem?.year || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doc-desc" className="text-xs uppercase tracking-wider text-muted-foreground">
                Synopsis / Description
              </Label>
              <Textarea
                id="doc-desc"
                rows={3}
                placeholder="Brief summary of the documentary, key takeaways, and emotional narrative..."
                value={editingItem?.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Cover Poster / Thumbnail
              </Label>
              <ImageUploader
                currentImageUrl={editingItem?.thumbnail_url || ''}
                onUpload={(url) => setEditingItem({ ...editingItem, thumbnail_url: url })}
                label="Upload Poster / Thumbnail"
                folder="documentaries"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={editingItem?.is_featured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked })}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="font-medium">Mark as Featured Spotlight</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={editingItem?.is_active ?? true}
                  onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="font-medium">Visible on Public Site</span>
              </label>
            </div>

            <DialogFooter className="pt-4 border-t border-border/40">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Documentary'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
