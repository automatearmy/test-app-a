'use client'
// pages/index.js (in your test-app-a project)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function Page({ session }) {

  const supabase = createClientComponentClient( { cookieOptions: {domain: "automatearmy.com", path: "/"} } );
  const user = supabase.auth.getUser();

  const userEmail = user?.email

  console.log("User: " + user)

  return (
    <div>
      {user ? (
        <p>Welcome, {userEmail} in test-app-a!</p>
      ) : (
        <p>Please sign in to continue.</p>
      )}
    </div>
  );
};

