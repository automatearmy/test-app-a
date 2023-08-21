'use client'
// pages/index.js (in your test-app-a project)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';

export default async function Page() {

  const supabase = createClientComponentClient( { cookieOptions: {domain: "automatearmy.com", path: "/"} } );

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Redirect to a sign-out confirmation page or any other page
      window.location.href = 'https://auth.automatearmy.com/';
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const userEmail = user?.email

  console.log("Session: " + session)
  console.dir(user)
  console.log(supabase.auth.getUser())

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

