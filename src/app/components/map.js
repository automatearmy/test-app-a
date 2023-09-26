'use client'
import ReactMapboxGl, { GeoJSONLayer, Layer, Feature } from 'react-mapbox-gl';
import * as MapboxGL from 'react-mapbox-gl'
import roads from "../intensity-score/roads.json";
import billboards from "../intensity-score/billboards.json";

const token = 'pk.eyJ1IjoienppbWJsZXIiLCJhIjoiY2pqaGhxZDZ3MDBwdTN2bXJiM3E3bm04byJ9.lHf70NPBi012mpkAg47wVw'

const Map = ReactMapboxGl({
  accessToken: token 
});

export default function MapComponent() {
  return (
    <>
      <h5 className="my-8 text-left text-base font-semibold leading-7 text-white">MetricOOH Intensity Score</h5> 
      <Map
        className='rounded-md overflow-hidden' 
        center={[ -97.524757, 35.473641]}
        style="mapbox://styles/mapbox/streets-v8"
      > 
        <GeoJSONLayer
          data={billboards}
          pointLayout={{
            'text-field': '{place}',
            'text-font': ['Open Sans Semibold'], 
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          }}
          pointPaint={{
            'text-color': 'green' 
          }}
        />
        {/*<GeoJSONLayer
          data={roads}
          lineLayout={{
          }}
          linePaint={{}}
        />*/}
      </Map>
    </> 
  )
}