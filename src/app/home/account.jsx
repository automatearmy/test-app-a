'use client'
import "./banner.css"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@mantine/core';
import Image from 'next/image';
import AppContainer from "../components/app-container";

export default function AccountPage({ session }) {
  const env = process.env
  
  const supabase = createClientComponentClient({cookieOptions: {domain: env.NEXT_PUBLIC_COOKIE_DOMAIN, path: "/"}});
  const user = session?.user;

  const src = "https://oohinfo.retool.com/embedded/public/1906c41e-d33f-4be1-b89b-6b89409e22bc"
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      window.location.href = env.NEXT_PUBLIC_AUTH_DOMAIN;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const userEmail = user?.email

  return (
      <AppContainer session={session} src={src} />
    // <div className='bg-[#3a435f] h-screen w-full'>
    //   <div className="w-full banner flex md:flex-row items-center justify-center flex-col-reverse md:justify-start md:items-center gap-4  mb-4">
    //     <h5 className="font-semibold leading-7 ml-4 text-white  ">Homepage</h5> 
    //     <Image src={'/oohChargerLogo.png'} width={50} height={50} priority alt="metricOOH logo"/>
    //   </div>
    //   {user ? (
    //     <div>
    //       <p>Welcome, {userEmail} in test-app-a!</p>
    //       <Button onClick={handleSignOut}>
    //         Sign out
    //       </Button>
    //     </div>
    //   ) : (
    //     <p>Please sign in to continue.</p>
    //   )}

    // </div>
    
  );
};

