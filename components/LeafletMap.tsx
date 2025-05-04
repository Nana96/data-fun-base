"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {StepData, StepType, MapFlyToProps} from "@/types/types"
import { Scrollama as Scrollama_, Step as Step_ } from "react-scrollama";

const Step = Step_<{ index: number }>;
const Scrollama = Scrollama_<{ index: number }>;

// load Standard-Marker-Icons in React/Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const steps: StepType[] = [
  { id: 0, coords: [52.52, 13.405], label: 'Berlin' },
  { id: 1, coords: [48.1372, 11.5756], label: 'München' },
  { id: 2, coords: [53.5511, 9.9937], label: 'Hamburg' },
];

const MapFlyTo = ({ coords }: MapFlyToProps) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 10); // zoom to coordinates
    }
  }, [coords, map]);
  return null;
};

export const LeafletScroller = () => {
  const [currentCoords, setCurrentCoords] = useState<[number, number]>(steps[0].coords);

  // Scrollama step event
  const onStepEnter = ({ data }: { data: StepData }) => {
    const step = steps.find((s) => s.id === data.index);
    if (step) {
      setCurrentCoords(step.coords);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Scroll-Panel */}
      <div style={{ width: '40%', height: '100vh', overflowY: 'scroll' }}>
        <Scrollama onStepEnter={onStepEnter} offset={0.5}>
          {steps.map((step) => (
            <Step data={step.id} key={step.id}>
              <div style={{ margin: '300px 0', padding: '2rem', background: '#eee' }}>
                <h2>{step.label}</h2>
                <p>Scroll zu {step.label}</p>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>

      {/* Map */}
      <div style={{ width: '60%', height: '100vh' }}>
        <MapContainer
          center={currentCoords}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='© OpenStreetMap-Mitwirkende'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFlyTo coords={currentCoords} />

          {/* Marker */}
          {steps.map((step, i) => (
            <Marker key={i} position={step.coords}>
              <Popup>{step.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};



