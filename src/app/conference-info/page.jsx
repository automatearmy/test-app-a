import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'
import AppContainer from '../components/app-container'

export default async function ConferenceInfo() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const src = "https://oohinfo.retool.com/embedded/public/038a38ae-83e3-4dc3-9764-4e00f48fcf58"

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
