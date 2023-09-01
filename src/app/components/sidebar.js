'use client'
import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
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
    { name: 'Dashboard', href: '/dashboard', icon: UsersIcon, current: currentRoute === '/dashboard' },
    { name: 'Plant Totals', href: '/plant-totals', icon: FolderIcon, current: currentRoute === '/plant-totals' },
  ]

  return (
    <div className="w-64 flex-shrink-0 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
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
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
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
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              {avatarUrl ? (
                <Image 
                  src={avatarUrl}
                  width={8}
                  height={8}
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              )}
              {/* h = 8 w = 8 */}
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{fullname}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}