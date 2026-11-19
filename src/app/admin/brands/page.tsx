'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Award,
  ImageIcon,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { BrandClient } from '@/lib/types/database';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<BrandClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Partial<BrandClient> | null>(null);

  const loadBrands = async () => {
    try {
      const res = await fetch('/api/admin/brands');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setBrands(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load brand clients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleOpenAdd = () => {
    setEditingBrand({
      name: '',
      logo_url: '',
      sort_order: brands.length + 1,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (brand: BrandClient) => {
    setEditingBrand(brand);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand || !editingBrand.name) {
      toast.error('Brand name is required');
      return;
    }
    setIsSaving(true);

    try {
      const isEdit = !!editingBrand.id;
      const url = '/api/admin/brands';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBrand),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save brand');
      }

      toast.success(isEdit ? 'Brand client updated!' : 'Brand added!');
      setIsDialogOpen(false);
      loadBrands();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving brand client');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this brand?')) return;

    try {
      const res = await fetch(`/api/admin/brands?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete brand');
      }

      toast.success('Brand client removed');
      setBrands((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting brand');
    }
  };

  const handleToggleActive = async (brand: BrandClient) => {
    try {
      const newStatus = !brand.is_active;
      const res = await fetch('/api/admin/brands', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: brand.id, is_active: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update brand status');

      setBrands((prev) =>
        prev.map((b) => (b.id === brand.id ? { ...b, is_active: newStatus } : b))
      );
      toast.success(`Brand ${newStatus ? 'shown' : 'hidden'} in marquee`);
    } catch (err) {
      toast.error('Could not update status');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminHeader title="Brand Clients & Logos" />
        <Button onClick={handleOpenAdd} className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Plus className="h-4 w-4" /> Add Brand Client
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : brands.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <Award className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-medium">No brand clients yet</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Upload logos of companies and partners you have worked with to show in the marquee.
          </p>
          <Button onClick={handleOpenAdd} size="sm">
            Add First Brand
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={`rounded-xl border p-4 transition-all shadow-sm flex flex-col justify-between ${
                brand.is_active
                  ? 'border-border/60 bg-card'
                  : 'border-border/40 bg-muted/20 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    #{brand.sort_order}
                  </span>
                  <button
                    onClick={() => handleToggleActive(brand)}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium border transition-colors ${
                      brand.is_active
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {brand.is_active ? 'Active' : 'Hidden'}
                  </button>
                </div>

                <div className="flex h-24 items-center justify-center rounded-lg bg-muted/40 p-2 mb-3">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground/60">
                      <ImageIcon className="h-6 w-6 mb-1" />
                      <span className="text-[10px]">No Logo</span>
                    </div>
                  )}
                </div>

                <h4 className="text-sm font-semibold font-heading text-center truncate">
                  {brand.name}
                </h4>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border/40 pt-3 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(brand)}
                  className="h-8 gap-1 text-xs"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(brand.id)}
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
              {editingBrand?.id ? 'Edit Brand Client' : 'Add Brand Client'}
            </DialogTitle>
          </DialogHeader>

          {editingBrand && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Brand Name</Label>
                <Input
                  id="name"
                  value={editingBrand.name || ''}
                  onChange={(e) =>
                    setEditingBrand({ ...editingBrand, name: e.target.value })
                  }
                  placeholder="e.g. BSR Hospital, Finest Mazda..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sort_order">Display Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={editingBrand.sort_order || 1}
                  onChange={(e) =>
                    setEditingBrand({
                      ...editingBrand,
                      sort_order: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label>Brand Logo (PNG or SVG recommended)</Label>
                <ImageUploader
                  currentImageUrl={editingBrand.logo_url}
                  onUpload={(url) => setEditingBrand({ ...editingBrand, logo_url: url })}
                  label="Upload Brand Logo"
                  folder="brands"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingBrand.is_active ?? true}
                  onChange={(e) =>
                    setEditingBrand({ ...editingBrand, is_active: e.target.checked })
                  }
                  className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Display in website marquee
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
                  Save Brand
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
