"use client"
import dynamic from "next/dynamic";

const LeafletScroller = dynamic(() => import("@/features/maps/LeafletMap").then(m => m.LeafletScroller), { ssr: false });
const D3Outlines = dynamic(() => import("@/features/complex_shapes/D3Outlines").then(m => m.D3Outlines), { ssr: false });
const ThreeDMap = dynamic(() => import("@/features/maps/3DMapShape").then(m => m.ThreeDMap), { ssr: false });
const GeoRef = dynamic(() => import("@/features/maps/GeoReferenceMap").then(m => m.RasterMap), { ssr: false });


export const pages = [
  {
    slug: "leaflet_scrolly",
    title: ["Scrollytelling with OpenStreetMap and Leaflet", "hi"],
    info: ["React", "React-Scrollama", "React-Leaflet", "Leaflet.js", "Material UI", "https://github.com/Nana96/data-fun-base/blob/main/features/maps/LeafletMap.tsx"],
    chart: <LeafletScroller />,
    code: [
      <>
        Installiere&nbsp;
        <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
          Node.js
        </a>
      </>,
      <>Initialisiere das Projekt mit <code>npm init</code></>,
      <>Installiere die Abhängigkeiten mit <code>npm install</code></>,
    ],
  },
  {
      slug: "organic_shapes_d3",
      title: ["Creating organic shapes with d3.js", "hi"],
           info: ["d3-geo.js", "Framer-motion", "React", "https://github.com/Nana96/data-fun-base/blob/main/features/complex_shapes/D3Outlines.tsx"],
      chart: <D3Outlines />,
      code: [
        <>
          Installiere&nbsp;
          <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
            Node.js
          </a>
        </>,
        <>Initialisiere das Projekt mit <code>npm init</code></>,
        <>Installiere die Abhängigkeiten mit <code>npm install</code></>,
      ],
    },
    {
         slug: "3d_map_shapes",
         title: ["Creating 3D map shapes with Three.js", "hi"],
      info: ["React", "React-Three", "Three.js", "d3-geo.js", "https://github.com/Nana96/data-fun-base/blob/main/features/maps/3DMapShape.tsx"],
         chart: <ThreeDMap />,
         code: [
           <>
             Installiere&nbsp;
             <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
               Node.js
             </a>
           </>,
           <>Initialisiere das Projekt mit <code>npm init</code></>,
           <>Installiere die Abhängigkeiten mit <code>npm install</code></>,
         ],
    },
    {
      slug: "geo_reference_map",
      title: ["Using QGIS Georeference with Leaflet", "This demo uses various tools to georeference an image and prepare it for interactive and dynamic use for web-based and data-driven storytelling."],
      info: ["QGIS", "geojson.io", "React", "React-Scrollama", "Leaflet.js", "https://github.com/Nana96/data-fun-base/blob/main/features/maps/GeoReferenceMap.tsx"],
      chart: <GeoRef />,
     code: [
       <>
         Georeference a png or jpg file in QGIS by following this&nbsp;
         <a href="http://www.qgistutorials.com/en/docs/3/georeferencing_basics.html" target="_blank" rel="noopener noreferrer">
           QGIS tutorial
         </a>
       </>,
       <>In QGIS, save the file as geotiff and create png tiles with different zoom levels by following&nbsp;<a href="https://www.orrbodies.com/tutorial/generating-tiles-qgis/" target="_blank" rel="noopener noreferrer">this tutorial</a> by orrbodies</>,
       <>Save both formats in the project's public folder</>,
       <>Create the map and overlay the tiles of the georeferenced image using Leaflet <code>L.map</code> and <code>L.tileLayer</code></>,
       <>Add geometric elements such as <code>L.CircleMarker</code> and <code>L.GeoJSON</code> by creating them with open source tools such as <a href="https://geojson.io/#map=2/0/20" target="_blank" rel="noopener noreferrer">geojson.io</a> and saving them as json file in the project</>,
       <>Make the view dynamic using Leaflet methods like <code>flyTo()</code> and <code>snakeIn()</code> for animation</>,
       <>Add scroll text for storytelling by using <code>React-Scrollama</code></>,

     ],
              }
];
