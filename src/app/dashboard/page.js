import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'

export default async function Dashboard() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    return (
        <div style={{ height: '100vh' }}>
            <div className='flex h-full'>
                <Sidebar 
                    className='h-full'
                    session={session}
                />
                <iframe src="https://oohinfo.retool.com/embedded/public/69c1c571-610e-4808-afdc-50fa966cff4a?company_id=dbb7d18c-8365-4481-8eb5-5010fef57f21" width="100%" height="100%"></iframe>
            </div>
        </div>
    )
}
