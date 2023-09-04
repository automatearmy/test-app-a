'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@mantine/core';

export default function AccountPage({ session }) {
  const supabase = createClientComponentClient( { cookieOptions: {domain: "automatearmy.com", path: "/"} } );
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      window.location.href = 'https://auth.automatearmy.com/';
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const userEmail = user?.email

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {userEmail} in test-app-a!</p>
          <Button onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      ) : (
        <p>Please sign in to continue.</p>
      )}
    </div>
  );
};

