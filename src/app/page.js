'use client'
// pages/index.js (in your test-app-a project)
import { useEffect, useState } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email} in test-app-a!</p>
      ) : (
        <p>Please sign in to continue.</p>
      )}
    </div>
  );
};

export default Home;
