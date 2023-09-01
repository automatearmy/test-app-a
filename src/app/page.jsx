import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountPage from './home/account'
import Sidebar from './components/sidebar'

export default async function Account() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className='flex h-full'>
        <Sidebar 
          className='h-full'
          session={session}
        />
        <AccountPage  session={session}/>
    </div>
  )
}