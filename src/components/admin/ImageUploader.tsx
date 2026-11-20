'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface ImageUploaderProps {
  currentImageUrl?: string | null;
  onUpload: (url: string) => void;
  bucket?: string;
  folder?: string;
  className?: string;
  label?: string;
}

export function ImageUploader({
  currentImageUrl,
  onUpload,
  bucket = 'media',
  folder = 'uploads',
  className = '',
  label = 'Upload Image',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        const supabase = createClient();
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
        setPreview(data.publicUrl);
        onUpload(data.publicUrl);
      } catch (err) {
        console.error('Upload error:', err);
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, onUpload]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setPreview(null);
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {preview ? (
        <div className="relative group rounded-xl overflow-hidden border border-border bg-black/10">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-44 sm:h-52 object-cover"
          />
          {/* Action overlay - Always visible buttons on mobile with touch-friendly sizing, hover reveal on desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end sm:items-center justify-center p-3 sm:p-0 gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="min-h-[40px] px-3.5 shadow-md touch-manipulation text-xs font-semibold"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={clearImage}
              className="min-h-[40px] px-3.5 shadow-md touch-manipulation text-xs font-semibold"
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-border/80 rounded-xl p-5 sm:p-8 text-center cursor-pointer hover:border-accent active:bg-accent/5 transition-all touch-manipulation"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-accent" />
              <p className="text-xs sm:text-sm font-medium text-foreground">Uploading image to storage...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground">
                Tap to upload from device (JPEG, PNG, WebP)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
