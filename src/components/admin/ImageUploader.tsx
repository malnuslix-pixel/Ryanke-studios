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
        <div className="relative group rounded-lg overflow-hidden border border-border">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">
                Click or drag & drop
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
