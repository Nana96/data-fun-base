"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import GeoRasterLayer from "georaster-layer-for-leaflet";
// @ts-ignore
import parseGeoraster from "georaster";
import { useEffect, useRef, useState } from "react";
import { Scrollama, Step } from "react-scrollama";

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
  const polylineRef = useRef<L.Polyline | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const initMap = async () => {
      const map = L.map("map", {
        center: points[0],
        zoom: 7,
        zoomControl: false,
      });
      mapRef.current = map;

      const response = await fetch("/GeoreferenceIndia.tiff");
      const arrayBuffer = await response.arrayBuffer();
      const georaster = await parseGeoraster(arrayBuffer);

      const layer = new GeoRasterLayer({
        georaster,
        opacity: 1,
        resolution: 256,
      });

      layer.addTo(map);

      const polyline = L.polyline([points[0]], { color: "red", weight: 4 }).addTo(map);
      polylineRef.current = polyline;
    };

    if (typeof window !== "undefined") initMap();
  }, []);

  // Update Pfad und FlyTo beim Scrollen
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const path = points.slice(0, stepIndex + 1);
    polylineRef.current?.setLatLngs(path);
    map.flyTo(points[stepIndex], 7, { duration: 2 });
  }, [stepIndex]);

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
      />

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
          {steps.map((step) => (
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
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: "2rem",
                    borderRadius: "8px",
                    border: stepIndex === step.id ? "2px solid red" : "1px solid #ccc",
                    width: "40%",
                  }}
                >
                  <h2>{step.label}</h2>
                  <p>Scroll weiter zu {step.label}</p>
                </div>
              </div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
};
