import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'
import AppContainer from '../components/app-container'

export default async function AssociateDirectory() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const src = "https://oohinfo.retool.com/embedded/public/c231c336-92c1-412f-8dc9-f5f32550c959"

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
