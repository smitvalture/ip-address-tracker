import React, { useEffect } from 'react';
import L from 'leaflet';
import iconLocation from '../assets/images/icon-location.svg'
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

    const customIcon = L.icon({
        iconUrl: iconLocation,
        iconSize: [40, 50], // Adjust the size based on your SVG marker dimensions
        iconAnchor: [16, 70], // Adjust the anchor position if needed
    });

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', zIndex: "10" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FlyToMap />
            <Marker position={position} icon={customIcon}>
                <Popup>Marker Location</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
