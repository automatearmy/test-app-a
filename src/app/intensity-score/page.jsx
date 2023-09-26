import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'
import Map from '../components/map'

export default async function IntensityScore() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()


    return (
        <div style={{ height: '100vh' }}>
            <div className='flex h-full bg-[#3a435f]'>
                <Sidebar 
                    className='h-full'
                    session={session}
                />
                <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
                    <Map />
                </div> 
            </div>
        </div>
    )
}
