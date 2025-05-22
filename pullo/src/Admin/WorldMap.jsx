// src/components/WorldMap.jsx
import { MapContainer, TileLayer } from 'react-leaflet';

const WorldMap = () => {
  return (
    <MapContainer
      center={[20, 0]} // Latitude, Longitude
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: '250px', width: '100%'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright"></a>' 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
    </MapContainer>
  );
};

export default WorldMap;
