import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { geoPath, geoMercator } from "d3-geo";
import districtJson from "../complex_shapes/district_data.json";

const coords = districtJson.features[0].geometry.coordinates[0];

const projection = geoMercator()
  .center([8.505, 47.385])
  .scale(200000)
  .translate([0, 0]); // Wichtig: wir nutzen x/y direkt

const projectedPoints = coords.map((coord) =>
  projection(coord) as [number, number]
);

// Wert für Extrusion
const extrudeValue = 65;

function ExtrudedShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    projectedPoints.forEach(([x, y], i) => {
      if (i === 0) {
        s.moveTo(x, -y); // Y invertieren, weil Three.js Y nach oben
      } else {
        s.lineTo(x, -y);
      }
    });
    return s;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(shape, {
      depth: extrudeValue,
      bevelEnabled: false,
    });
  }, [shape]);

  return (
    <mesh geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial color={"#0077ff"} />
    </mesh>
  );
}

export const ThreeDMap = () => {
  return (
    <div style={{ width: "800px", height: "400px" }}>
      {/* Optional: SVG für Debugging */}
      <svg viewBox="-100 -100 200 200" style={{ position: "absolute" }}>
        <path
          d={
            geoPath().projection(projection)({
              type: "Polygon",
              coordinates: [coords],
            } as any) ?? ""
          }
          stroke="red"
          fill="blue"
        />
      </svg>

      {/* Three.js Canvas */}
      <Canvas camera={{ position: [0, -100, 150], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[100, 100, 100]} />
        <ExtrudedShape />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
