'use client';

import { useRownd } from '@rownd/next';
import { useEffect } from 'react';

export function AuthButtonHandler() {
  const { requestSignIn, signOut, manageAccount, is_authenticated, is_initializing } = useRownd();

  // Handle auth state changes
  useEffect(() => {
    if (!is_initializing && is_authenticated) {
      const needsRefresh = localStorage.getItem('needs_auth_refresh');
      if (needsRefresh === 'true') {
        localStorage.removeItem('needs_auth_refresh');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }
  }, [is_authenticated, is_initializing]);

  // Handle auth button
  useEffect(() => {
    const button = document.querySelector('[data-auth-button]');
    if (!button) return;

    const handleClick = async (e: Event) => {
      e.preventDefault();
      if (is_authenticated) {
        await signOut();
        window.location.href = '/';
      } else {
        localStorage.setItem('needs_auth_refresh', 'true');
        requestSignIn();
      }
    };

    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, [is_authenticated, requestSignIn, signOut]);

  // Handle profile button
  useEffect(() => {
    const profileButton = document.querySelector('[data-profile-button]');
    if (!profileButton) return;

    const handleProfileClick = (e: Event) => {
      e.preventDefault();
      manageAccount();
    };

    profileButton.addEventListener('click', handleProfileClick);
    return () => profileButton.removeEventListener('click', handleProfileClick);
  }, [manageAccount]);

  return null;
}