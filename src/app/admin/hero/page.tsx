'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Save, Image as ImageIcon, Plus, X } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { HeroSection } from '@/lib/types/database';

export default function AdminHeroPage() {
  const [hero, setHero] = useState<Partial<HeroSection>>({
    badge_texts: [],
  });
  const [newBadge, setNewBadge] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch('/api/admin/hero');
        if (res.ok) {
          const data = await res.json();
          if (data) setHero(data);
        }
      } catch (err) {
        console.error('Failed to load hero data:', err);
        toast.error('Could not load hero section data');
      } finally {
        setIsLoading(false);
      }
    }

    loadHero();
  }, []);

  const handleChange = (field: keyof HeroSection, value: any) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddBadge = () => {
    if (!newBadge.trim()) return;
    const current = hero.badge_texts || [];
    setHero((prev) => ({ ...prev, badge_texts: [...current, newBadge.trim()] }));
    setNewBadge('');
  };

  const handleRemoveBadge = (index: number) => {
    const current = hero.badge_texts || [];
    setHero((prev) => ({
      ...prev,
      badge_texts: current.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update hero section');
      }

      toast.success('Hero section updated successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving hero section');
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
    <div className="space-y-8 pb-12">
      <AdminHeader title="Hero Section Editor" />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <ImageIcon className="h-5 w-5 text-accent" />
            <h2 className="text-base font-semibold font-heading">Homepage Hero Banner</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={hero.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                placeholder="Your Vision, Our Lens"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subheadline">Subheadline</Label>
              <Input
                id="subheadline"
                value={hero.subheadline || ''}
                onChange={(e) => handleChange('subheadline', e.target.value)}
                placeholder="Your Dream Studios"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Hero Paragraph</Label>
            <Textarea
              id="description"
              value={hero.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="We capture moments that last forever..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cta_text">Primary Button Text</Label>
              <Input
                id="cta_text"
                value={hero.cta_text || ''}
                onChange={(e) => handleChange('cta_text', e.target.value)}
                placeholder="Book Now"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_link">Primary Button Link</Label>
              <Input
                id="cta_link"
                value={hero.cta_link || ''}
                onChange={(e) => handleChange('cta_link', e.target.value)}
                placeholder="https://wa.me/254718445264"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Hero Background / Featured Image</Label>
            <ImageUploader
              currentImageUrl={hero.hero_image_url}
              onUpload={(url) => handleChange('hero_image_url', url)}
              label="Upload Hero Image"
              folder="hero"
            />
          </div>

          {/* Badges / Pill Tags */}
          <div className="space-y-3">
            <Label>Highlight Badges</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(hero.badge_texts || []).map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-medium border border-accent/20"
                >
                  {badge}
                  <button
                    type="button"
                    onClick={() => handleRemoveBadge(idx)}
                    className="hover:text-destructive transition-colors ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-md">
              <Input
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                placeholder="Add badge (e.g. 4K Drone Footage)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddBadge();
                  }
                }}
              />
              <Button type="button" onClick={handleAddBadge} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-6 z-20 flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg px-8"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Hero Section
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
