'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Briefcase,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
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
import { Service } from '@/lib/types/database';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const loadServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setServices(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingService({
      title: '',
      description: '',
      icon: 'Camera',
      features: [],
      sort_order: services.length + 1,
      is_active: true,
    });
    setFeatureInput('');
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService({
      ...service,
      features: Array.isArray(service.features) ? service.features : [],
    });
    setFeatureInput('');
    setIsDialogOpen(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingService) return;
    const current = editingService.features || [];
    setEditingService({
      ...editingService,
      features: [...current, featureInput.trim()],
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: (editingService.features || []).filter((_, i) => i !== idx),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;
    setIsSaving(true);

    try {
      const isEdit = !!editingService.id;
      const url = '/api/admin/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save service');
      }

      toast.success(isEdit ? 'Service updated!' : 'Service created!');
      setIsDialogOpen(false);
      loadServices();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving service');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete service');
      }

      toast.success('Service deleted');
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting service');
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const updatedStatus = !service.is_active;
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, is_active: updatedStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, is_active: updatedStatus } : s))
      );
      toast.success(`Service marked ${updatedStatus ? 'active' : 'inactive'}`);
    } catch (err) {
      toast.error('Could not update status');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <AdminHeader
        title="Services Manager"
        action={
          <Button
            onClick={handleOpenAdd}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-9 px-3 text-xs font-semibold touch-manipulation shadow-sm"
          >
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add</span> Service
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-xl border border-border/60 bg-card p-8 sm:p-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-base font-medium">No services found</h3>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Add services to display what Ryankey Studios offers on the public website.
          </p>
          <Button onClick={handleOpenAdd} size="sm">
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-xl border p-4 sm:p-5 transition-all shadow-sm flex flex-col justify-between ${
                service.is_active
                  ? 'border-border/60 bg-card'
                  : 'border-border/40 bg-muted/20 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-accent/10 text-accent text-xs font-semibold">
                      {service.sort_order}
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base tracking-tight font-heading">
                      {service.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleToggleActive(service)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium border transition-colors touch-manipulation min-h-[30px] ${
                      service.is_active
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {service.is_active ? 'Active' : 'Hidden'}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {service.description}
                </p>

                {Array.isArray(service.features) && service.features.length > 0 && (
                  <div className="space-y-1 mb-4 border-t border-border/40 pt-2.5">
                    <span className="text-[11px] font-medium text-muted-foreground">Features:</span>
                    <ul className="text-xs space-y-1 text-foreground/80">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-accent shrink-0" /> <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border/40 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(service)}
                  className="min-h-[36px] px-3 gap-1.5 text-xs touch-manipulation"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                  className="min-h-[36px] min-w-[36px] p-0 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive touch-manipulation"
                  title="Delete service"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingService?.id ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
          </DialogHeader>

          {editingService && (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={editingService.title || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, title: e.target.value })
                  }
                  placeholder="e.g. Corporate & Brand Photography"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="icon">Lucide Icon Name</Label>
                  <Input
                    id="icon"
                    value={editingService.icon || 'Camera'}
                    onChange={(e) =>
                      setEditingService({ ...editingService, icon: e.target.value })
                    }
                    placeholder="Building, Camera, Film..."
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sort_order">Display Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={editingService.sort_order || 1}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        sort_order: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingService.description || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  placeholder="Explain what the service provides and who it is for..."
                  rows={3}
                  required
                />
              </div>

              {/* Features Builder */}
              <div className="space-y-2">
                <Label>Service Deliverables / Features</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(editingService.features || []).map((feat, idx) => (
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
                    placeholder="e.g. Brand Campaigns"
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
                  checked={editingService.is_active ?? true}
                  onChange={(e) =>
                    setEditingService({ ...editingService, is_active: e.target.checked })
                  }
                  className="rounded border-border text-accent focus:ring-accent h-4 w-4"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Display this service on the website
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
                  Save Service
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
