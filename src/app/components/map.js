'use client'
import { useState } from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer, Feature, Popup, Marker } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoienppbWJsZXIiLCJhIjoiY2pqaGhxZDZ3MDBwdTN2bXJiM3E3bm04byJ9.lHf70NPBi012mpkAg47wVw",

});
export default function MapComponent({ originCoordinates, roadData, billboardData, pointLayout, symbolLayout, pointPaint, billboardLineColor = {
  A: 'green',
  B: 'greenyellow',
  C: 'yellow',
  D: 'orange',
  F: 'red'
}}) {
 
 
  const [billboardPopup, setBillboardPopup] = useState(null) 
  const [billboardPopupData,setBillboardPopupData] = useState({})
  const lineLayout = {};
  
  const roadLinePaint = {
    'line-color': {
      property: 'intensity', 
      type: 'interval',
      stops: [
        [0, "gray"],
        [20, "gray"],
        [40, "turquoise"],
        [60, "magenta"],
        [80, "red"],
        [100, "red"]
      ],
    },
    'line-width': 2,
  };
  const billboardLinePaint = {
    'circle-color': {
      property: 'ScoreUA', 
      type: 'categorical',
      stops: [
        ["A", billboardLineColor.A],
        ["B", billboardLineColor.B],
        ["C", billboardLineColor.C],
        ["D", billboardLineColor.D],
        ["F", billboardLineColor.F],
      ],
    },
    'circle-radius': 8,
  };
  
  const handleClosePopup = () => {
    return setBillboardPopup(null)
  }
  return (
    <>
      <Map
        className='rounded-md overflow-hidden' 
        center={originCoordinates}
        style="mapbox://styles/mapbox/streets-v8"

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
          // setBillboardPopupData(null)
          // setBillboardPopup(null)
          const {properties} = e.features[0]
          setBillboardPopup(e.lngLat)
          setBillboardPopupData(properties)
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
          <div className="max-w-xs rounded overflow-hidden">
            <div className="bg-gray-200 p-2">
              <div className="font-bold text-xl mb-2 text-right" onClick={() => {
                return setBillboardPopup(null)
              }}>X</div>
              <div className="font-bold  text-center text-xl mb-2">Billboard Details</div>
            </div>
            <div className="px-6 py-2">
              <div className="mb-2">
                <span className="font-bold" >Score:</span>  <span className='font-bold'>{billboardPopupData.ScoreUA} </span>
              </div>
              <div className="mb-2">
                <span className="font-bold">Revision:</span> {billboardPopupData.Revision}
              </div>
              <div className="mb-2">
                <span className="font-bold">Street View URL:</span>{' '}
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
    </> 
  )
}