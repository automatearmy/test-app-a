import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'

export default async function PlantTotals() {
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
                <iframe src="https://oohinfo.retool.com/embedded/public/10f45537-f718-4ed9-b511-e7112cff35e3" width="100%" height="100%"></iframe>
            </div>
        </div>
    )
}