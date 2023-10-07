import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from "../components/sidebar"
import ProfileInfo from "../components/profile-info"
import AppContainer from '../components/app-container'

export default async function Profile() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()
    
    const src = "https://oohinfo.retool.com/embedded/public/40e4ec62-2c03-4132-bd4a-4333be48155c"
    return (
        <div style={{ height: '100vh' }}>
            <div className="flex h-full bg-[#3a435f]">
                <Sidebar session={session}/>
                    {/* <ProfileInfo session={session}/> */}
                <AppContainer session={session} src={src} />
            </div>
        </div>
    )
}