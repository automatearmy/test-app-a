import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'
import AppContainer from '../components/app-container'

export default async function IntensityScore() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const src = "https://oohinfo.retool.com/embedded/public/11ba5444-ad6c-499e-9ce3-f7661ade57b9"

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
