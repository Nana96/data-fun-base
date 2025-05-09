"use client"
import dynamic from "next/dynamic";

const LeafletScroller = dynamic(() => import("@/features/maps/LeafletMap").then(m => m.LeafletScroller), { ssr: false });
const D3Outlines = dynamic(() => import("@/features/complex_shapes/D3Outlines").then(m => m.D3Outlines), { ssr: false });

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
];
