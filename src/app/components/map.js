"use client";
import { useState } from "react";
import ReactMapboxGl, { GeoJSONLayer, Layer, Popup } from "react-mapbox-gl";
const Map = ReactMapboxGl({
	accessToken: "pk.eyJ1IjoienppbWJsZXIiLCJhIjoiY2pqaGhxZDZ3MDBwdTN2bXJiM3E3bm04byJ9.lHf70NPBi012mpkAg47wVw",

});
export default function MapComponent({ originCoordinates, roadData, billboardData, 
	roadLinePaint = {
		"line-color": {
			property: "intensity", 
			type: "interval",
			stops: [
				[0, "gray"],
				[20, "gray"],
				[40, "turquoise"],
				[60, "magenta"],
				[80, "blue"],
				[100, "blue"]
			],
		},
		"line-width": 2,
	}, 
	billboardLineColor = {
		A: "green",
		B: "greenyellow",
		C: "yellow",
		D: "orange",
		F: "red"
	}}) {
 
 
	const [billboardPopup, setBillboardPopup] = useState(null); 
	const [billboardPopupData,setBillboardPopupData] = useState({});
	const lineLayout = {};
  

	const billboardLinePaint = {
		"circle-color": {
			property: "ScoreUA", 
			type: "categorical",
			stops: [
				["A", billboardLineColor.A],
				["B", billboardLineColor.B],
				["C", billboardLineColor.C],
				["D", billboardLineColor.D],
				["F", billboardLineColor.F],
			],
		},
		"circle-radius": 8,
	};
	const [showLegends,setShowLegends] = useState(false);
	const handleClosePopup = () => {
		return setBillboardPopup(null);
	};
	return (
		<>
			<Map
				className='rounded-md overflow-hidden' 
				center={originCoordinates}
				style="mapbox://styles/mapbox/light-v11"
				onStyleLoad={() => {
					setShowLegends(true);
				}}
			> 
				<GeoJSONLayer
					data={roadData}
					lineLayout={lineLayout}
					linePaint={roadLinePaint}
				/>
				<GeoJSONLayer
					key={"billboard"}
					id="billboard"
					className={"cursor-pointer"}
					data={billboardData}
					getCursor={(e) => "pointer"}
					circlePaint={billboardLinePaint}
					circleOnClick={(e) => {

						const {properties} = e.features[0];
						setBillboardPopup(e.lngLat);
						setBillboardPopupData(properties);
					}}
				/>
				<Layer  
					id="billboard-layer"
					source='billboard'
					source-layer='original'
					type={"circle"} paint={billboardLinePaint} />
				{billboardPopup &&  (
					<Popup
						latitude={billboardPopup.lat}
						longitude={billboardPopup.lng}
						coordinates={[billboardPopup.lng, billboardPopup.lat]} 
						closeButton={true}
						closeOnClick={false}
						onClose={handleClosePopup}
						offset={5}
					>
						<div className="max-w-xs rounded overflow-hidden p-2">
							<div className="bg-gray-200">
								<div className="font-bold text-xl mb-2 text-right cursor-pointer" onClick={() => {
									return setBillboardPopup(null);
								}}>X</div>
								<div className="font-bold  text-center text-xl mb-2">Billboard Details</div>
							</div>
							<div className="px-6 py-2">
								<div className="mb-2">
									<span className="font-bold" >Score:</span>  <span className='font-bold'>{billboardPopupData.ScoreUA ? billboardPopupData.ScoreUA : "---"} </span>
								</div>
								<div className="mb-2">
									<span className="font-bold">Revision:</span> {billboardPopupData.Revision}
								</div>
								<div className="mb-2">
									<span className="font-bold">Street View URL:</span>{" "}
									<a
										href={billboardPopupData.StreetViewUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 hover:underline"
									>
                  Open Street View
									</a>
								</div>
							</div>
						</div>

					</Popup>)} 
			</Map>
			{showLegends && (
				<div className="mt-4">
				
					<div className="flex justify-center">
          
						<div className="mb-2 mr-6">
							<h1 className="text-slate-200 font-bold text-md">Billboards (Score)</h1>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2   font-bold rounded-full" style={{backgroundColor:billboardLineColor.A}}></div>
								<div className="text-white">A - Highest Score</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2   font-bold rounded-full" style={{backgroundColor:billboardLineColor.B}}></div>
								<div className="text-white">B</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2   font-bold rounded-full" style={{backgroundColor:billboardLineColor.C}}></div>
								<div className="text-white">C</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2   font-bold rounded-full" style={{backgroundColor:billboardLineColor.D}}></div>
								<div className="text-white">D</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2   font-bold rounded-full" style={{backgroundColor:billboardLineColor.F}}></div>
								<div className="text-white">F - Lowest Score</div>
							</div>
						</div>

						<div className="mb-2">
							<h1 className="text-slate-200 font-bold text-md">Roads (Intensity)</h1>

							<div className="flex items-center">
								<div className="w-4 h-4 mr-2" style={{
									backgroundColor: roadLinePaint["line-color"].stops[0][1]
								}}></div>
								<div className="text-white" >Roads - Low intensity</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2" style={{
									backgroundColor: roadLinePaint["line-color"].stops[2][1]
								}}></div>
								<div className="text-white" >Roads - Medium Intensity</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2" style={{
									backgroundColor: roadLinePaint["line-color"].stops[3][1]
								}}></div>
								<div className="text-white" >Roads - High Intensity</div>
							</div>
							<div className="flex items-center">
								<div className="w-4 h-4 mr-2" style={{
									backgroundColor: roadLinePaint["line-color"].stops[4][1]
								}}></div>
								<div className="text-white" >Roads - Highest Intesity</div>
							</div>
						</div>

					</div>
				</div>
			)}
			
		</> 
	);
}