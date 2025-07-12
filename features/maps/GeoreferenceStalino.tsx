"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import GeoRasterLayer from "georaster-layer-for-leaflet";
// @ts-ignore
import parseGeoraster from "georaster";
import { useEffect, useRef, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import paths from "@/data/paths.json";
import type { Feature, FeatureCollection } from "geojson";
import { Box } from "@mui/material";


const points: [number, number][] = [
  [48.0159, 37.8029], // Donezk, Ukraine
];

const steps = [
  { id: 0, coords: points[0], label: 'Donezk' },
];

export const StalinoMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const loadMap = async () => {
      if (typeof window !== "undefined") {
        // @ts-ignore
        await import("leaflet.polyline.snakeanim");

        const map = L.map("map", {
          center: points[0],
          zoom: 13,
          zoomControl: false,
        });
        mapRef.current = map;

         const response = await fetch("/StadtplanStalino_georeference.tif");
             const arrayBuffer = await response.arrayBuffer();
             const georaster = await parseGeoraster(arrayBuffer);

             const rasterLayer = new GeoRasterLayer({
               georaster,
               opacity: 1,
               resolution: 256,
             });

             rasterLayer.addTo(map);
             //map.fitBounds(rasterLayer.getBounds());

             setMapLoaded(true);
      }
    };

    loadMap();
  }, []);

  return (
    <div style={{ position: "relative", height: `${steps.length * 100}vh` }}>
      {/* map */}
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
                   width: "100%",
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
