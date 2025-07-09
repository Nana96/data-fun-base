"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import paths from "@/data/paths.json";
import type { Feature, FeatureCollection } from "geojson";
import { Box } from "@mui/material";


const points: [number, number][] = [
  [15.2993, 74.1240], // Goa
  [13.0827, 80.2707], // Chennai
  [8.5241, 76.9366],  // Thiruvananthapuram
];

const steps = [
  { id: 0, coords: points[0], label: 'Goa' },
  { id: 1, coords: points[1], label: 'Chennai' },
  { id: 2, coords: points[2], label: 'Thiruvananthapuram' },
];

export const RasterMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const pathLayerRefs = useRef<L.GeoJSON[]>([]);
  const markerRefs = useRef<L.CircleMarker[]>([]);
  const prevStepRef = useRef<number>(stepIndex);

  useEffect(() => {
    const loadMap = async () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        await import("leaflet.polyline.snakeanim");

        const map = L.map("map", {
          center: points[0],
          zoom: 7,
          zoomControl: false,
        });
        mapRef.current = map;

        L.tileLayer("/tiles/{z}/{x}/{y}.png", {
          tileSize: 256,
          minZoom: 0,
          maxZoom: 10,
          attribution: "&copy; Datenquelle",
          noWrap: true,
        }).addTo(map);

        setMapLoaded(true);
      }
    };

    loadMap();
  }, []);


 // Update Map when stepIndex changes
   useEffect(() => {
     if (!mapRef.current || !mapLoaded) return;

     const map = mapRef.current;

     // Fly to current point
     const currentStep = steps[stepIndex];
     const zoomLevel = window.innerWidth < 600 ? 6 : 6.6;
     map.flyTo(currentStep.coords, zoomLevel, { duration: 1.5 });

     map.once("moveend", () => {

     // Remove all markers and paths first
     markerRefs.current.forEach((marker) => map.removeLayer(marker));
     markerRefs.current = [];

     pathLayerRefs.current.forEach((layer) => map.removeLayer(layer));
     pathLayerRefs.current = [];

     // Add all markers up to current step
     for (let i = 0; i <= stepIndex; i++) {
       const circle = L.circleMarker(steps[i].coords, {
         radius: 12,
         color: "#f03b20",
         fillColor: "#f03b20",
         fillOpacity: 0.8,
       });
       circle.addTo(map);
       markerRefs.current.push(circle);
     }

     // Add all path layers up to stepIndex - 1
     const featuresToShow = paths.features.slice(0, stepIndex);
     featuresToShow.forEach((feature) => {
       const geoJsonLayer = L.geoJSON(feature as GeoJSON.Feature, {
         style: { color: "#f03b20", weight: 4 },
       });
       geoJsonLayer.addTo(map);
       (geoJsonLayer as any).snakeIn();
       pathLayerRefs.current.push(geoJsonLayer);
     });
     });
   }, [stepIndex, mapLoaded]);

  return (
    <div style={{ position: "relative", height: `${steps.length * 100}vh` }}>
      {/* Karte */}
      <div
        id="map"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          zIndex: 0,
        }}
      >
      <img
          src="/India.png"
          alt="Overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "160%",
            height: "160%",
            zIndex: 1, // oder zIndex: 1, je nachdem ob es über oder unter der Karte sein soll
            pointerEvents: "none", // wichtig, damit die Karte trotzdem interaktiv bleibt
          }}
        />
      </div>

      {/* Scroll Steps Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Scrollama
          offset={0.5}
          onStepEnter={({ data }: { data: number }) => {
            setStepIndex(data);
          }}
        >
          {steps.map((step, i) => (
            <Step data={step.id} key={step.id}>
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  position: "relative",
                }}
              >
             <Box
               sx={{
                 backgroundColor: "rgba(240, 59, 32, 0.5)",
                 padding: "2rem",
                 width: {
                   xs: "100%",  // for mobile
                   sm: "40%",   // from md (900px)
                 },
                 height: "auto",
               }}
             >
               <div
                 style={{
                   padding: "1rem",
                   width: "100%", // nutzt volle Breite im Eltern-Div
                 }}
               >
                  <h2>{step.label}</h2>
                  {i < steps.length - 1 ? (
                            <p>Scroll weiter zu {steps[i + 1].label}</p>
                          ) : (
                            <p>Ende erreicht</p>
                          )}
                </div>
                </Box>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
};
