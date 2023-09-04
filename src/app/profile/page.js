import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from "../components/sidebar"
import ProfileInfo from "../components/profile-info"

export default async function Profile() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()
    
    return (
        <div style={{ height: '100vh' }}>
            <div className="flex h-full">
                <Sidebar session={session}/>
                <ProfileInfo session={session}/>
            </div>
        </div>
    )
}