"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState, useCallback, useEffect } from 'react'
import LoadingSpinner from './loadingSpinner'
import { CompaniesSelect } from './companiesSelect'
import { lastCompanySelectedKey } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'

export default function AppContainer({session, src}) {


  const supabase = createClientComponentClient({ cookieOptions: {domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, path: "/"} })
  const [loading, setLoading] = useState(true)
  const [currentCompanyId, setCurrentCompanyId] = useState(null)
  const [companies, setCompanies] = useState([])
  const [contactId, setContactId] = useState(null)
  const route = useRouter()
  const user = session?.user
  // console.log("user ==>", user)
  const getCompanyId = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('profiles')
        .select('id,company_id,contact_id')
        .eq('user_id', user?.id)
        .single()

      const getAllcompanies =  await supabase 
        .from('profile_company')
        .select('id,company_id,company_name')
        .eq('profile_id', data.id) 
     
        
        if(getAllcompanies.data.length < 1) {
          route.push(`https://auth.oohinfo.org/awaiting`)
          return;
        }
        if ( (error && status !== 406) || (getAllcompanies.error && getAllcompanies.status !== 406)) {
          throw error
        }
        setCompanies(getAllcompanies.data)
        const lastCompanySelected = localStorage.getItem(lastCompanySelectedKey)
        const ensureCompany = getAllcompanies.data.find(({company_id}) => company_id === lastCompanySelected)  
       
        lastCompanySelected && ensureCompany ? setCurrentCompanyId(lastCompanySelected) : setCurrentCompanyId(getAllcompanies.data[0].company_id)
      if (data) {
        // setCompanyId(data.company_id)
        setContactId(data.contact_id)
      }
    } catch (error) {
      console.log(error)
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
  function handleCompanyChange(id) {
    setCurrentCompanyId(id)

    localStorage.setItem(lastCompanySelectedKey, id)
  }
  const appUrl = `${src}?company_id=${currentCompanyId}&user_id=${user?.id}&contact_id=${contactId}`
  return (

     <div className=" w-full  flex flex-col bg-[#3A435F]">
      <div className='ml-4'>
        <CompaniesSelect 
        defaultValue={currentCompanyId}
        companies={companies} 
        onCompanyChange={(event) => {
          handleCompanyChange(event.target.value)
        }}/>
      </div>
      {<iframe src={appUrl} width="100%" height="100%" className='bg-[#3a435f]'></iframe>}
    </div>
   
  )
}