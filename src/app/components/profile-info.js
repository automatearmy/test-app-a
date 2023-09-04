'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

export default function ProfileInfo({ session }) {
    const supabase = createClientComponentClient({ cookieOptions: {domain: "automatearmy.com", path: "/"} })
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
            <Image 
                height={32}
                width={32}
                src={avatarUrl}
                alt='Profile photo'
            />
        </div>
    )
}