'use client'
// pages/index.js (in your test-app-a project)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function Page({ session }) {

  const supabase = createClientComponentClient( { cookieOptions: {domain: "automatearmy.com", path: "/"} } );
  
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await supabase.auth.getUser();
      setUserEmail(user?.email);
    };

    getUserInfo();
  }, []);

  return (
    <div>
      {user ? (
        <p>Welcome, {getUserEmail} in test-app-a!</p>
      ) : (
        <p>Please sign in to continue.</p>
      )}
    </div>
  );
};

