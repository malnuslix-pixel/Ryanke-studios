'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Save, UserCheck, Plus, Trash2, X } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { AboutContent } from '@/lib/types/database';

export default function AdminAboutPage() {
  const [about, setAbout] = useState<Partial<AboutContent>>({
    stats: [],
    unique_points: [],
  });
  const [newPoint, setNewPoint] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch('/api/admin/about');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setAbout({
              ...data,
              stats: Array.isArray(data.stats) ? data.stats : [],
              unique_points: Array.isArray(data.unique_points) ? data.unique_points : [],
            });
          }
        }
      } catch (err) {
        console.error('Failed to load about data:', err);
        toast.error('Could not load about page data');
      } finally {
        setIsLoading(false);
      }
    }

    loadAbout();
  }, []);

  const handleChange = (field: keyof AboutContent, value: any) => {
    setAbout((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (index: number, key: 'value' | 'label', val: string) => {
    const updated = [...(about.stats || [])];
    updated[index] = { ...updated[index], [key]: val };
    setAbout((prev) => ({ ...prev, stats: updated }));
  };

  const handleAddStat = () => {
    const updated = [...(about.stats || []), { value: '', label: '' }];
    setAbout((prev) => ({ ...prev, stats: updated }));
  };

  const handleRemoveStat = (index: number) => {
    const updated = (about.stats || []).filter((_, i) => i !== index);
    setAbout((prev) => ({ ...prev, stats: updated }));
  };

  const handleAddPoint = () => {
    if (!newPoint.trim()) return;
    setAbout((prev) => ({
      ...prev,
      unique_points: [...(prev.unique_points || []), newPoint.trim()],
    }));
    setNewPoint('');
  };

  const handleRemovePoint = (index: number) => {
    setAbout((prev) => ({
      ...prev,
      unique_points: (prev.unique_points || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update about content');
      }

      toast.success('About page content saved successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving about page');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <AdminHeader
        title="About Page Editor"
        action={
          <Button
            type="button"
            onClick={handleSubmit as any}
            disabled={isSaving}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-9 min-h-[36px]"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="hidden xs:inline">Save</span>
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Story & Headings */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <UserCheck className="h-5 w-5 text-accent" />
            <h2 className="text-base font-semibold font-heading">Brand Story & Mission</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={about.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="About Ryankey Studios"
                className="min-h-[42px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle / Hook</Label>
              <Input
                id="subtitle"
                value={about.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Capturing Excellence in Nairobi"
                className="min-h-[42px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Studio Story & Bio</Label>
            <Textarea
              id="story"
              value={about.story || ''}
              onChange={(e) => handleChange('story', e.target.value)}
              placeholder="Tell the story of how Ryankey Studios was founded and your creative approach..."
              rows={5}
            />
          </div>
        </div>

        {/* CEO / Founder Profile */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          <h2 className="text-base font-semibold font-heading border-b border-border/40 pb-3">
            Founder & Lead Photographer Profile
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ceo_name">Founder Name</Label>
              <Input
                id="ceo_name"
                value={about.ceo_name || ''}
                onChange={(e) => handleChange('ceo_name', e.target.value)}
                placeholder="Brian Abuga"
                className="min-h-[42px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ceo_title">Title / Role</Label>
              <Input
                id="ceo_title"
                value={about.ceo_title || ''}
                onChange={(e) => handleChange('ceo_title', e.target.value)}
                placeholder="Founder & Lead Photographer"
                className="min-h-[42px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Founder Photo</Label>
            <ImageUploader
              currentImageUrl={about.ceo_image_url}
              onUpload={(url) => handleChange('ceo_image_url', url)}
              label="Upload Founder Photo"
              folder="team"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h2 className="text-base font-semibold font-heading">Studio Milestone Stats</h2>
            <Button
              type="button"
              onClick={handleAddStat}
              variant="outline"
              size="sm"
              className="gap-1 min-h-[36px] touch-manipulation"
            >
              <Plus className="h-4 w-4" /> Add Stat
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {(about.stats || []).map((stat, idx) => (
              <div key={idx} className="relative rounded-lg border border-border/60 bg-muted/20 p-4 space-y-3">
                <button
                  type="button"
                  onClick={() => handleRemoveStat(idx)}
                  className="absolute right-2 top-2 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors touch-manipulation"
                  aria-label="Remove stat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="space-y-1">
                  <Label className="text-xs">Stat Value (e.g. 5000+)</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    placeholder="5000+"
                    className="min-h-[40px]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Label (e.g. Clients Served)</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    placeholder="Clients Served"
                    className="min-h-[40px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unique Points */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          <h2 className="text-base font-semibold font-heading border-b border-border/40 pb-3">
            Why Choose Ryankey Studios (Bullet Points)
          </h2>

          <div className="flex flex-wrap gap-2 mb-3">
            {(about.unique_points || []).map((point, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground border border-border/60"
              >
                {point}
                <button
                  type="button"
                  onClick={() => handleRemovePoint(idx)}
                  className="p-1 -mr-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors touch-manipulation"
                  aria-label={`Remove ${point}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 max-w-md">
            <Input
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              placeholder="Add selling point (e.g. Fast 48h turnaround)"
              className="min-h-[42px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPoint();
                }
              }}
            />
            <Button
              type="button"
              onClick={handleAddPoint}
              variant="outline"
              size="sm"
              className="min-h-[42px] sm:min-h-0 touch-manipulation"
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        <div className="sticky bottom-4 z-20 flex justify-end p-2 sm:p-0 bg-background/80 sm:bg-transparent backdrop-blur sm:backdrop-blur-none rounded-xl">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto min-h-[44px] bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg px-8 font-medium"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save About Page
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
