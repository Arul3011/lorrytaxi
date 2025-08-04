import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RouteMap = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const [routeCoords, setRouteCoords] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async()=>{
    if (from && to) {
        const response = await axios.post("http://localhost:3000/api/queries", { from, to })
          const convertedCoords = response.data.path.map(([lng, lat]: number[]) => [lat, lng]);
          setRouteCoords(convertedCoords);
       setLoading(false);
      console.log("recived");
      
  }})();
    
  }, [from, to]);

  if (loading) return <p>Loading map...</p>;
  if (!routeCoords) return <p>Could not load route.</p>;
// return(
//   <>
//   map</>
// )
  return (
    <MapContainer
      center={routeCoords[0]}
      zoom={16}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Start Marker */}
      <Marker position={routeCoords[0]} />

      {/* End Marker */}
      <Marker position={routeCoords[routeCoords.length - 1]} />

      {/* Route Path */}
      <Polyline positions={routeCoords} pathOptions={{ color: 'blue', weight: 4 }} />
    </MapContainer>
  );
};

export default RouteMap;
