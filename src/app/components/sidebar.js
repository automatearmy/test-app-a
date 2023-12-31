'use client'
import {
  FolderIcon,
  HomeIcon,
  InformationCircleIcon,
  UsersIcon,
  ServerIcon,
  StarIcon,
  MapIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon

} from '@heroicons/react/24/outline'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState, useCallback } from 'react'
import { IconArrowLeft } from '@tabler/icons-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ session }) {
  
  const currentRoute = usePathname()
  const supabase = createClientComponentClient({ cookieOptions: {domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, path: "/"} })
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const user = session?.user
  const route = useRouter()
  //console.log("User: " + user)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('user_id', user?.id)
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
  async function logoutHandler() {
    await supabase.auth.signOut()
    route.push('https://auth.oohinfo.org/')

  }
  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: currentRoute === '/' },
    { name: 'PerView Overview', href: '/overview', icon: InformationCircleIcon, current: currentRoute === '/overview' },
    { name: 'PerView Plant Totals', href: '/plant-totals', icon: FolderIcon, current: currentRoute === '/plant-totals' },
    { name: 'Speedway Updates', href: '/inventory-updates', icon: ServerIcon, current: currentRoute === '/inventory-updates' },
    { name: 'MetricOOH Intensity Score', href: '/intensity-score', icon: MapIcon, current: currentRoute === '/intensity-score' },
    { name: 'Conference Info', href: '/conference-info', icon: StarIcon, current: currentRoute === '/conference-info' },
    { name: 'Associate Directory', href: '/associate-directory', icon: UsersIcon, current: currentRoute === '/associate-directory' },
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
                
                <>       
                  <Image 
                    src={avatarUrl}
                    
                    width={32}
                    height={32}
                    alt="Profile photo"
                    className='rounded-full'
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{fullname}</span>
                 
                </>
                
              ) : (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-400 mr-2 animate-pulse"></div>
                  <div>
                    <div className="h-4 w-20 bg-gray-400 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-400 rounded mt-1 animate-pulse"></div>
                  </div>
                </div>
              )}
              {/* h = 8 w = 8 */}
           
            </a>
            {user && <div className="flex justify-start gap-2 mt-2 w-[80%] mx-auto ">
              <button className="flex gap-2 hover:cursor-pointer" onClick={logoutHandler}>
                <ArrowLeftOnRectangleIcon className="h-6 w-6 text-black hover:cursor-pointer" />
                <span aria-hidden="true">Logout</span>
              </button>
            </div>}


          </li>
        </ul>
      </nav>
    </div>
  )
}