import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountPage from './home/account'
import { Sidebar } from './components/sidebar'

export default async function Account() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("Session: " + session)

  return (
    <div className='flex flex-row'>
      <div>
        <Sidebar />
      </div>
      <div>
        <AccountPage session={session} />
      </div>
    </div>
  )
}