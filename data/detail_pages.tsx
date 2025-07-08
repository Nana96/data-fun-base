"use client"
import dynamic from "next/dynamic";

const LeafletScroller = dynamic(() => import("@/features/maps/LeafletMap").then(m => m.LeafletScroller), { ssr: false });
const D3Outlines = dynamic(() => import("@/features/complex_shapes/D3Outlines").then(m => m.D3Outlines), { ssr: false });
const ThreeDMap = dynamic(() => import("@/features/maps/3DMapShape").then(m => m.ThreeDMap), { ssr: false });
const GeoRef = dynamic(() => import("@/features/maps/GeoReferenceMap").then(m => m.RasterMap), { ssr: false });


export const pages = [
  {
    slug: "leaflet_scrolly",
    title: "Scrollytelling with OpenStreetMap and Leaflet",
    chart: <LeafletScroller />,
    code: "Some code or explanation as string or JSX",
  },
  {
      slug: "organic_shapes_d3",
      title: "Creating organic shapes with d3.js",
      chart: <D3Outlines />,
      code: "Some code or explanation as string or JSX",
    },
    {
         slug: "3d_map_shapes",
         title: "Creating 3D map shapes with Three.js",
         chart: <ThreeDMap />,
         code: "Some code or explanation as string or JSX",
    },
    {
      slug: "geo_reference_map",
      title: "Using QGIS Georeference with Leaflet",
      chart: <GeoRef />,
      code: "Some code or explanation as string or JSX\nInitialisiere das Projekt\nInstalliere die Abhängigkeiten",
    },
];
