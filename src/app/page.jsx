import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountPage from './home/account'

export default async function Account() {
  // const supabase = createServerComponentClient({ cookies })

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()

  console.log("Session: " + session)

  return (
    <div className='flex flex-row'>
        <AccountPage />
    </div>
  )
}

//session={session}