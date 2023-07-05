import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ lat, lng }) => {
    const position = [lat, lng];

    const FlyToMap = () => {
        const map = useMap();

        useEffect(() => {
            map.flyTo(position, 13, {
                duration: 2, // Animation duration in seconds
                easeLinearity: 0.5,
            });
        }, [position, map]);

        return null;
    };

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', zIndex: "10" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FlyToMap />
            <Marker position={position}>
                <Popup>Marker Location</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
