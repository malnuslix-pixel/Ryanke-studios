'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Save, Building2, Phone, Mail, Globe, Share2, MapPin } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { SiteSettings } from '@/lib/types/database';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          if (data) setSettings(data);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
        toast.error('Could not load site settings');
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update settings');
      }

      toast.success('Site settings saved successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error saving settings');
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
    <div className="space-y-6 sm:space-y-8 pb-16">
      <AdminHeader
        title="Site Settings"
        action={
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-9 px-3.5 text-xs font-semibold touch-manipulation shadow-sm"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" /> Save
              </>
            )}
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* Studio Identity */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-sm sm:text-base font-semibold font-heading">Studio Identity</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="studio_name">Studio Name</Label>
              <Input
                id="studio_name"
                value={settings.studio_name || ''}
                onChange={(e) => handleChange('studio_name', e.target.value)}
                placeholder="Ryankey Studios"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={settings.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="Your Dream Studios"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <ImageUploader
              currentImageUrl={settings.logo_url}
              onUpload={(url) => handleChange('logo_url', url)}
              label="Upload Studio Logo"
              folder="branding"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">SEO Meta Description</Label>
            <Textarea
              id="meta_description"
              value={settings.meta_description || ''}
              onChange={(e) => handleChange('meta_description', e.target.value)}
              placeholder="Primary description shown in Google search results..."
              rows={3}
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Phone className="h-5 w-5 text-accent" />
            <h2 className="text-sm sm:text-base font-semibold font-heading">Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="phone_call">Call Phone Number</Label>
              <Input
                id="phone_call"
                value={settings.phone_call || ''}
                onChange={(e) => handleChange('phone_call', e.target.value)}
                placeholder="+254 702 340 700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_whatsapp">WhatsApp Number (e.g. 254...)</Label>
              <Input
                id="phone_whatsapp"
                value={settings.phone_whatsapp || ''}
                onChange={(e) => handleChange('phone_whatsapp', e.target.value)}
                placeholder="254718445264"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="ryankeyimages@gmail.com"
              />
            </div>
          </div>
        </div>

        {/* Studio Location */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <MapPin className="h-5 w-5 text-accent" />
            <h2 className="text-sm sm:text-base font-semibold font-heading">Location & Maps</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address_line1">Address Line 1</Label>
              <Input
                id="address_line1"
                value={settings.address_line1 || ''}
                onChange={(e) => handleChange('address_line1', e.target.value)}
                placeholder="Nexus Business Centre"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line2">Address Line 2 / City</Label>
              <Input
                id="address_line2"
                value={settings.address_line2 || ''}
                onChange={(e) => handleChange('address_line2', e.target.value)}
                placeholder="Ruiru Bypass (Kamakis)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="google_maps_embed_url">Google Maps Embed URL</Label>
            <Input
              id="google_maps_embed_url"
              value={settings.google_maps_embed_url || ''}
              onChange={(e) => handleChange('google_maps_embed_url', e.target.value)}
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Share2 className="h-5 w-5 text-accent" />
            <h2 className="text-sm sm:text-base font-semibold font-heading">Social Media & Direct Links</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={settings.instagram_url || ''}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                placeholder="https://www.instagram.com/ryankey_studios"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={settings.facebook_url || ''}
                onChange={(e) => handleChange('facebook_url', e.target.value)}
                placeholder="https://www.facebook.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktok_url">TikTok URL</Label>
              <Input
                id="tiktok_url"
                value={settings.tiktok_url || ''}
                onChange={(e) => handleChange('tiktok_url', e.target.value)}
                placeholder="https://www.tiktok.com/@_ryankey_"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp_url">Direct WhatsApp Link</Label>
              <Input
                id="whatsapp_url"
                value={settings.whatsapp_url || ''}
                onChange={(e) => handleChange('whatsapp_url', e.target.value)}
                placeholder="https://wa.me/254718445264"
              />
            </div>
          </div>
        </div>

        {/* Mobile Sticky Save Button */}
        <div className="sticky bottom-4 sm:bottom-6 z-20 flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl px-8 w-full sm:w-auto min-h-[44px] touch-manipulation font-semibold text-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Settings...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save All Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
