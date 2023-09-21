"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState, useCallback, useEffect } from 'react'
import LoadingSpinner from './loadingSpinner'

export default function AppContainer({session, src}) {
  const supabase = createClientComponentClient({ cookieOptions: {domain: "automatearmy.com", path: "/"} })
  const [loading, setLoading] = useState(true)
  const [companyId, setCompanyId] = useState(null)
  const user = session?.user

  const getCompanyId = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`company_id`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCompanyId(data.company_id)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getCompanyId()
  }, [user, getCompanyId])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <LoadingSpinner />
      </div>
    )
  }
  const appUrl = `${src}?company_id=${companyId}&user_id=${user?.id}`

  return (
    <>
      {<iframe src={appUrl} width="100%" height="100%"></iframe>}
    </>
  )
}