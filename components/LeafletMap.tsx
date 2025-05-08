"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {StepData, StepType, MapFlyToProps} from "@/types/types"
import { Scrollama as Scrollama_, Step as Step_ } from "react-scrollama";
import Box from '@mui/material/Box';

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
  const [currentCoords, setCurrentCoords] = useState<[number, number] | undefined>(steps[0].coords);

  // Scrollama step event
  const onStepEnter = ({ data }: { data: StepData }) => {
    const step = steps.find((s) => s.id === data.index);
    if (step) {
      setCurrentCoords(step.coords);
    }
  };

  const onStepExit = ({ data }: { data: StepData }) => {
      if (data.index === 0) {
        setCurrentCoords(undefined);
      }
      if (data.index === steps.length) {
        setCurrentCoords(undefined);
      }
    };

  return (
   <Box sx={{ position: "relative", minHeight: `${steps.length * 100}vh` }}>
      {/* Map */}
      <Box
            sx={{
              position: "sticky",
              top: 0,
              height: "100vh",
              width: "100%",
              zIndex: 0,
            }}
          >
        <MapContainer
          center={currentCoords ?? [0, 0]}
          zoom={20}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='© OpenStreetMap-Mitwirkende'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentCoords && <MapFlyTo coords={currentCoords} />}
          {steps.map((step, i) => (
            <Marker key={i} position={step.coords}>
              <Popup>{step.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      {/* Scroll-Panel */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Scrollama onStepEnter={onStepEnter} offset={0.5}  onStepExit={onStepExit}>
          {steps.map((step) => (
            <Step data={{ index: step.id }} key={step.id}>
              <Box
                          sx={{
                            height: "100vh",
                            zIndex: 100,
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                            position: "relative",
                            px:  "20vw" ,
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: "rgba(184, 169, 163, 0.7)",
                              margin: '300px 0',
                              width: '40%',
                              p: '2rem',
                            }}
                          >
                <h2>{step.label}</h2>
                <p>Scroll zu {step.label}</p>
              </Box>
             </Box>
            </Step>
          ))}
        </Scrollama>
</Box>
    </Box>
  );
};



