'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

export default function ProfileInfo({ session }) {
  const env = process.env
  
  const supabase = createClientComponentClient({ cookieOptions: {domain: env.NEXT_PUBLIC_COOKIE_DOMAIN, path: "/"} })
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const user = session?.user

    const getProfile = useCallback(async () => {
        try {
          setLoading(true)
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`full_name, avatar_url`)
            .eq('id', user?.id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setFullname(data.full_name)
            setAvatarUrl(data.avatar_url)
          }
        } catch (error) {
          alert('Error loading user data!')
        } finally {
          setLoading(false)
        }
      }, [user, supabase])
    
      useEffect(() => {
        getProfile()
    }, [user, getProfile])

    return (
        <div>
            <ui>
                <li>Full name: {fullname}</li>
                <li>Avatar URL: {avatarUrl}</li>
            </ui>
            {avatarUrl ? (
                <Image 
                  src={avatarUrl}
                  width={8}
                  height={8}
                  alt="Profile photo"
                />
              ) : (
                <p>No avatar</p>
              )}
        </div>
    )
}