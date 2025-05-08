"use client"
import dynamic from "next/dynamic";

const LeafletScroller = dynamic(() => import("@/components/LeafletMap").then(m => m.LeafletScroller), { ssr: false });

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
      chart: <div>Hello</div>,
      code: "Some code or explanation as string or JSX",
    },
];
