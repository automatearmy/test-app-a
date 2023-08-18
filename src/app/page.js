'use client'
// pages/index.js (in your test-app-a project)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Page({ session }) {

  const supabase = createClientComponentClient();
  const user = session?.user;

  const userEmail = user?.email

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
