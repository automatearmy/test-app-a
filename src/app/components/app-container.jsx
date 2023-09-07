"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react'

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
    getProfile()
  }, [user, getProfile])
  if (loading) {
    return (
      <div>Loading!</div>
    )
  }
  return (
    <>
      {<iframe src={`${src}${companyId}`} width="100%" height="100%"></iframe>}
    </>
  )
}