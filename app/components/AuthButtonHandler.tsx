'use client';

import { useRownd } from '@rownd/next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AuthButtonHandler() {
  const { requestSignIn, signOut, is_authenticated, is_initializing } = useRownd();
  const router = useRouter();

  // Handle sign-in completion
  useEffect(() => {
    if (is_initializing) return;

    const needsRefresh = localStorage.getItem('needs_auth_refresh');
    
    if (needsRefresh === 'true' && is_authenticated) {
      localStorage.removeItem('needs_auth_refresh');
      // Small delay to ensure Rownd has completed its internal state updates
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [is_authenticated, is_initializing]);

  useEffect(() => {
    const button = document.querySelector('[data-auth-button]');
    if (!button) return;

    const handleClick = async (e: Event) => {
      e.preventDefault();
      if (is_authenticated) {
        localStorage.removeItem('needs_auth_refresh');
        await signOut();
        // Ensure we're on the home page before refreshing
        if (window.location.pathname !== '/') {
          router.push('/');
        }
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        localStorage.setItem('needs_auth_refresh', 'true');
        requestSignIn();
      }
    };

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, [is_authenticated, requestSignIn, signOut, router]);

  return null;
}