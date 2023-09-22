import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'
import AppContainer from '../components/app-container'

export default async function PlantTotals() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const src = "https://oohinfo.retool.com/embedded/public/10f45537-f718-4ed9-b511-e7112cff35e3"

    return (
        <div style={{ height: '100vh' }}>
            <div className='flex h-full bg-[#3a435f]'>
                <Sidebar 
                    className='h-full'
                    session={session}
                />
                <AppContainer session={session} src={src} />
            </div>
        </div>
    )
}