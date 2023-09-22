'use client'
import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ServerIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState, useCallback } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ session }) {
  const currentRoute = usePathname()
  const supabase = createClientComponentClient({ cookieOptions: {domain: "automatearmy.com", path: "/"} })
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const user = session?.user

  console.log("User: " + user)

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

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: currentRoute === '/' },
    { name: 'PerView Overview', href: '/overview', icon: UsersIcon, current: currentRoute === '/overview' },
    { name: 'PerView Plant Totals', href: '/plant-totals', icon: FolderIcon, current: currentRoute === '/plant-totals' },
    { name: 'Speedway Updates', href: '/inventory-updates', icon: ServerIcon, current: currentRoute === '/inventory-updates' },
    { name: 'Inventory RFO Sold', href: '/inventory-sold', icon: ServerIcon, current: currentRoute === '/inventory-sold' },
    { name: 'MetricOOH Intensity Score', href: '/intensity-score', icon: ServerIcon, current: currentRoute === '/intensity-score' },
    { name: 'Conference Info', href: '/conference-info', icon: ServerIcon, current: currentRoute === '/conference-info' },
    { name: 'Associate Directory', href: '/associate-directory', icon: ServerIcon, current: currentRoute === '/associate-directory' },
  ]

  return (
    <div className="w-64 flex-shrink-0 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-[#f6d87a] px-6 relative">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          src='/oohChargerLogo.png'
          width={32}
          height={32}
          alt='IBO Logo'
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-amber-100 text-stone-800'
                        : 'text-gray-700 hover:text-stone-600 hover:bg-amber-200',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-stone-800' : 'text-stone-800 group-hover:text-stone-800',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto absolute bottom-5 w-full">
            <a
              href="/profile"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-amber-200"
            >
              {avatarUrl ? (
                <Image 
                  src={avatarUrl}
                  
                  width={32}
                  height={32}
                  alt="Profile photo"
                  className='rounded-full'
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src=""
                  alt=""
                />
              )}
              {/* h = 8 w = 8 */}
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{fullname ?? 'User'}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}