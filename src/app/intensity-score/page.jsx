import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Sidebar from '../components/sidebar'
import Map from '../components/map'
import roads from "../intensity-score/roads.json";
import billboards from "../intensity-score/billboards.json";
import devBillboards from "../intensity-score/devBillboards.json"
import devRoads from "../intensity-score/devRoads.json"

export default async function IntensityScore() {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()


    return (
      <>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
        <div style={{ height: '100vh' }}>
            <div className='flex h-full bg-[#3a435f]'>
                <Sidebar 
                    className='h-full'
                    session={session}
                />
                <h5 className="my-8 text-left text-base font-semibold leading-7 text-white">MetricOOH Intensity Score</h5> 
                <div className='flex flex-col items-center justify-center gap-4'>
          
                  <Map roadData={roads} billboardData={billboards} originCoordinates={[ -97.524757, 35.473641]}
                    pointLayout={{
                      'text-field': '{place}',
                      'text-font': ['Open Sans Semibold'], 
                      'text-offset': [0, 0.6],
                      'text-anchor': 'top'
                    }}
                    symbolLayout={{
                      'icon-image': 'marker-15', 
                      'icon-size': 1.5,
                    }}
                  />
                </div> 
    
     
                
            </div>
        </div>
      </>
    )
}
