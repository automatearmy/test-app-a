import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Sidebar from "../components/sidebar";
import Map from "../components/map";
// import roads from "../intensity-score/roads.json";
// import billboards from "../intensity-score/billboards.json";
import Image from "next/image";
import reducedBillboards from "../intensity-score/reducedBillboard.json"
import reducedRoads from "../intensity-score/reducedRoads.json"

export default async function IntensityScore() {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

  // if(process.env.NODE_ENV == "development") {
  //   roads.features = roads.features.slice(0,200)
  //   billboards.features = billboards.features.slice(0, 200)
  // }

	return (
		<>
			<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
			<div style={{ height: "100vh" }}>
				<div className='flex  h-full bg-[#3a435f]'>
					<Sidebar 
						className='h-full'
						session={session}
					/>
					<div className='flex flex-col items-center justify-start w-full mx-auto '>
            <div className="w-full flex md:flex-row items-center justify-center flex-col-reverse md:justify-start md:items-center gap-4 mt-4 mb-4">
						  <h5 className="font-semibold leading-7 ml-10 text-white  ">MetricOOH Intensity Score</h5> 
              <Image src={'/metricOOH.png'} width={200} height={150} priority alt="metricOOH logo"/>
            </div>
						<div className='w-[95%]'>
							<Map roadData={reducedRoads} billboardData={reducedBillboards} originCoordinates={[ -97.524757, 35.473641]}
								pointLayout={{
									"text-field": "{place}",
									"text-font": ["Open Sans Semibold"], 
									"text-offset": [0, 0.6],
									"text-anchor": "top"
								}}
								symbolLayout={{
									"icon-image": "marker-15", 
									"icon-size": 1.5,
								}}
							/>
						</div>
                 
					</div> 
    
     
                
				</div>
			</div>
		</>
	);
}

