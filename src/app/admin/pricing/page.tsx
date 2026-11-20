'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  CreditCard,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { PricingPackage } from '@/lib/types/database';

export default function AdminPricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Partial<PricingPackage> | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const loadPackages = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setPackages(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load pricing packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenAdd = () => {
    setEditingPkg({
      name: '',
      price: 'Ksh ',
      subtitle: 'Studio Shoot',
      features: [],
      tag: null,
      sort_order: packages.length + 1,
      is_active: true,
    });
    setFeatureInput('');
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (pkg: PricingPackage) => {
    setEditingPkg({
      ...pkg,
      features: Array.isArray(pkg.features) ? pkg.features : [],
    });
    setFeatureInput('');
    setIsDialogOpen(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingPkg) return;
    const current = editingPkg.features || [];
    setEditingPkg({
      ...editingPkg,
      features: [...current, featureInput.trim()],
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingPkg) return;
    setEditingPkg({
      ...editingPkg,
      features: (editingPkg.features || []).filter((_, i) => i !== idx),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg || !editingPkg.name || !editingPkg.price) {
      toast.error('Package name and price are required');
      return;
    }
    setIsSaving(true);

    try {
      const isEdit = !!editingPkg.id;
      const url = '/api/admin/pricing';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPkg),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save package');
      }

      toast.success(isEdit ? 'Package updated!' : 'Package created!');
      setIsDialogOpen(false);
      loadPackages();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving package');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing package?')) return;

    try {
      const res = await fetch(`/api/admin/pricing?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete package');
      }

      toast.success('Package deleted');
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting package');
    }
  };

  const handleToggleActive = async (pkg: PricingPackage) => {
    try {
      const newStatus = !pkg.is_active;
      const res = await fetch('/api/admin/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pkg.id, is_active: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, is_active: newStatus } : p))
      );
      toast.success(`Package ${newStatus ? 'active' : 'hidden'}`);
    } catch (err) {
      toast.error('Could not update package status');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <AdminHeader
        title="Pricing Packages"
        action={
          <Button
            onClick={handleOpenAdd}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-9 px-3 text-xs font-semibold touch-manipulation shadow-sm"
          >
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add</span> Package
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-8 sm:p-12 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-medium">No pricing packages found</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Add photography and videography packages with prices and deliverables.
          </p>
          <Button onClick={handleOpenAdd} size="sm">
            Add First Package
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-xl border p-4 sm:p-6 transition-all shadow-sm flex flex-col justify-between ${
                pkg.tag
                  ? 'border-accent/40 bg-accent/[0.02]'
                  : 'border-border/60 bg-card'
              } ${!pkg.is_active ? 'opacity-60' : ''}`}
            >
              {pkg.tag && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-accent px-3 py-0.5 text-[11px] font-semibold text-accent-foreground shadow-sm">
                    {pkg.tag}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-2 mb-2 mt-1">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg font-heading">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground">{pkg.subtitle}</p>
                  </div>
                  <button
                    onClick={() => handleToggleActive(pkg)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium border transition-colors touch-manipulation min-h-[30px] ${
                      pkg.is_active
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {pkg.is_active ? 'Active' : 'Hidden'}
                  </button>
                </div>

                <div className="my-3 sm:my-4">
                  <span className="text-xl sm:text-2xl font-bold font-heading text-accent">
                    {pkg.price}
                  </span>
                </div>

                {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                  <ul className="space-y-2 border-t border-border/40 pt-3 sm:pt-4 mb-4 text-xs">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground/80">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border/40 pt-3 sm:pt-4 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(pkg)}
                  className="min-h-[36px] px-3 gap-1.5 text-xs touch-manipulation font-medium"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(pkg.id)}
                  className="min-h-[36px] min-w-[36px] p-0 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive touch-manipulation"
                  title="Delete package"
                >
                  <Trash2 className="h-4 w-4" />
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
              {editingPkg?.id ? 'Edit Pricing Package' : 'Add New Pricing Package'}
            </DialogTitle>
          </DialogHeader>

          {editingPkg && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Package Name</Label>
                  <Input
                    id="name"
                    value={editingPkg.name || ''}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, name: e.target.value })
                    }
                    placeholder="e.g. Standard Package"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={editingPkg.price || ''}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, price: e.target.value })
                    }
                    placeholder="e.g. Ksh 4,500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="subtitle">Subtitle / Type</Label>
                  <Input
                    id="subtitle"
                    value={editingPkg.subtitle || ''}
                    onChange={(e) =>
                      setEditingPkg({ ...editingPkg, subtitle: e.target.value })
                    }
                    placeholder="e.g. Studio / Outdoor"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tag">Badge Tag (Optional)</Label>
                  <Input
                    id="tag"
                    value={editingPkg.tag || ''}
                    onChange={(e) =>
                      setEditingPkg({
                        ...editingPkg,
                        tag: e.target.value ? e.target.value : null,
                      })
                    }
                    placeholder="Popular, Best Value..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sort_order">Display Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={editingPkg.sort_order || 1}
                  onChange={(e) =>
                    setEditingPkg({
                      ...editingPkg,
                      sort_order: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <Label>Included Features / Deliverables</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(editingPkg.features || []).map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs border border-border"
                    >
                      {feat}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. 20 Edited Photos"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddFeature} variant="outline" size="sm">
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingPkg.is_active ?? true}
                  onChange={(e) =>
                    setEditingPkg({ ...editingPkg, is_active: e.target.checked })
                  }
                  className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Display this package on the website
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
                  Save Package
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
