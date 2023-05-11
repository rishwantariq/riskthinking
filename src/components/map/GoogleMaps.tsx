import React, { useRef, useState } from 'react';
import { MappedData } from './Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Box, Icon, Typography } from '@mui/material';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { LocationOn } from '@mui/icons-material';

interface MapComponentProps {
  mappedData: MappedData[];
}

interface Item {
  lat: number;
  long: number;
  name: string;
  riskRating: number;
}

const colorStops = [
  { max: 10, color: '#00ff00' }, // green
  { max: 20, color: '#1aff1a' },
  { max: 30, color: '#33ff33' },
  { max: 40, color: '#66ff66' },
  { max: 50, color: '#99ff99' },
  { max: 60, color: '#cccccc' },
  { max: 70, color: '#ff9999' },
  { max: 80, color: '#ff6666' },
  { max: 90, color: '#ff3333' },
  { max: Infinity, color: '#ff0000' } //
];

const getIconUrl = (rating : number) => {
  let color;
  let scaledSize;
  if (rating > 60) {
    color = "red";
    scaledSize = new window.google.maps.Size(40, 40);
  } else if (rating > 40 && rating < 60) {
    color = "orange";
    scaledSize = new window.google.maps.Size(50, 50);
  } else {
    color = "green";
    scaledSize = new window.google.maps.Size(60, 60);
  }
  return `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
};



const MapComponent = (mappedData : MapComponentProps) => {
  const [selectedMarker, setSelectedMarker] = useState<MappedData | null>(null);
  const [center, setCenter] = useState({ lat: 46.1351, lng: -60.1831 });
  const [mapCenter, setMapCenter] = useState(center);
  const mapRef = useRef<google.maps.Map>();

  const handleMarkerHover = (marker : MappedData) => {
    setSelectedMarker(marker);
  };
  const handleMarkerLeave = () => {
    setSelectedMarker(null);
  };
  const key = "AIzaSyD7OQTuKAyorXDfARICdwBlq6gce3y71Yw";
  const environmentKey = `${process.env.GOOGLE_MAPS_API_KEY}`;
  console.log(environmentKey);
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <LoadScript googleMapsApiKey= "AIzaSyD7OQTuKAyorXDfARICdwBlq6gce3y71Yw">
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={mapCenter}
          zoom={4}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onCenterChanged={() => setCenter(mapRef.current?.getCenter()?.toJSON() || { lat: 0, lng: 0 })}
          >
          {mappedData.mappedData.map((item) => (
            <Marker
              key={item.name}
              position={{ lat: item.lat, lng: item.long }}
              onMouseOver={() => handleMarkerHover(item)}
              onMouseOut={() => handleMarkerLeave()}
              icon={{
                url: getIconUrl(Number(item.riskRating)),
                scaledSize: new window.google.maps.Size(50, 50),

              }}
             >
              {selectedMarker === item && (
                <InfoWindow onCloseClick={() => setSelectedMarker(null)}
                options={{ maxWidth: 150 }}
                >
                  <div style={{opacity: '0.5'}}>
                    <div style={{color: 'black'}}>
                      <Typography variant='h4' fontWeight={'bold'}>{item.name}</Typography>
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <div>
                          <LocationOnIcon style={{fill: 'black'}}/>
                        </div>
                        <div>
                          <Typography variant='h5' fontWeight={'regular'}>{item.lat}</Typography>
                          <Typography variant='h5' fontWeight={'regular'}>{item.long}</Typography>
                       </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                        <FunctionsIcon style={{fill: 'black'}}/>
                        <Typography variant='h4' fontWeight={'medium'}>{item.riskRating}%</Typography>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;