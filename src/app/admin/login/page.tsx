'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Camera, Lock, Mail, KeyRound, ArrowLeft, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [authMode, setAuthMode] = useState<'secret' | 'credentials'>('secret');
  const [secretKey, setSecretKey] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [email, setEmail] = useState('admin@ryankeystudios.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = authMode === 'secret'
        ? { secretKey }
        : { email, password };

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Invalid secret key or credentials');
        setIsLoading(false);
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-7 rounded-2xl border border-border/40 bg-card/70 p-8 shadow-2xl backdrop-blur-md sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg shadow-accent/20">
          <Camera className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight font-heading">
          Ryankey Studios
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to access your administrative dashboard
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 rounded-xl bg-muted/60 p-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => {
            setAuthMode('secret');
            setError(null);
          }}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all duration-200 ${
            authMode === 'secret'
              ? 'bg-accent text-accent-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <KeyRound className="h-3.5 w-3.5" />
          Secret Key
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthMode('credentials');
            setError(null);
          }}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition-all duration-200 ${
            authMode === 'credentials'
              ? 'bg-accent text-accent-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          Email & Password
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {authMode === 'secret' ? (
          <div className="space-y-2">
            <Label htmlFor="secretKey" className="text-xs uppercase tracking-wider text-muted-foreground">
              Admin Dashboard Secret Key
            </Label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-accent" />
              <Input
                id="secretKey"
                type={showSecretKey ? 'text' : 'password'}
                placeholder="Enter secret key..."
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                className="pl-10 pr-10"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showSecretKey ? 'Hide secret key' : 'Show secret key'}
                tabIndex={-1}
              >
                {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Enter the master secret key configured for Ryankey Studios.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ryankeystudios.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-2 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : authMode === 'secret' ? (
            'Access Dashboard'
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="text-center pt-1">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Public Website
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
