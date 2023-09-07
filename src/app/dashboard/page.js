import { useEffect, useState } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Sidebar from '../components/sidebar'

export default function Dashboard() {
    const [session, setSession] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            const supabase = createServerComponentClient({ cookies });
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                const { data: profile } = await supabase
                    .from('profile')
                    .select('company_id')
                    .eq('id', session.user.id)
                    .single();

                setCompanyId(profile ? profile.company_id : null);
            }
        }

        fetchData();
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <div className='flex h-full'>
                {session && <Sidebar className='h-full' session={session} />}
                {companyId && <iframe src={`https://oohinfo.retool.com/embedded/public/69c1c571-610e-4808-afdc-50fa966cff4a?company_id=${companyId}`} width="100%" height="100%"></iframe>}
            </div>
        </div>
    );
}
