'use client'
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Page({ session }) {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const supabase = createClientComponentClient({ cookieOptions: { domain: "automatearmy.com", path: "/" } });

      try {
        const user = await supabase.auth.getUser();
        setUser(user);
        setUserEmail(user?.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []); // Empty dependency array to run the effect only once

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

