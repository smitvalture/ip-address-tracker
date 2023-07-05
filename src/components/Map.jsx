import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Map = () => {
    const position = [51.505, -0.09]; // Example position for the map center

    return (
        <div className="z-10 h-4/5 w-screen">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} />
            </MapContainer>
        </div>
    );
};

export default Map;
