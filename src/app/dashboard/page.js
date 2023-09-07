import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'

export default async function Dashboard() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Fetch the company_id from the profile table where the ID equals to the user ID
    const { data: profile } = await supabase
      .from('profile')
      .select('company_id')
      .eq('id', session.user.id)
      .single()

    const companyId = profile ? profile.company_id : null

    return (
        <div style={{ height: '100vh' }}>
            <div className='flex h-full'>
                <Sidebar 
                    className='h-full'
                    session={session}
                />
                {companyId && <iframe src={`https://oohinfo.retool.com/embedded/public/69c1c571-610e-4808-afdc-50fa966cff4a?company_id=${companyId}`} width="100%" height="100%"></iframe>}
            </div>
        </div>
    )
}
