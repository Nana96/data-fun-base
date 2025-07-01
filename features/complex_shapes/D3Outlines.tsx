import {motion} from "framer-motion";
import districtJson from "./district_data.json";
import {useMemo} from "react";
import {
  geoCentroid,
  GeoGeometryObjects,
  geoMercator,
  geoPath,
  GeoPermissibleObjects,
} from "d3-geo";

const scales = [ 1, 1.0824334978388523, 1.1648669956777045, 1.2473004935165568, 1.3297339913554092, 1.4121674891942613, 1.4946009870331136, 1.577034484871966 ];
const coords = districtJson.features[0]; //.geometry.coordinates[0];

export const D3Outlines = () => {

 // Calculate centroid if currentDistrict exists
  const centroid = useMemo(() => {
    if (coords) {
      return geoCentroid(coords as GeoGeometryObjects); // Longitude, Latitude of the centroid
    }
    return [0, 0];
  }, [coords]);

  // Projection with dynamic center
  const projection = useMemo(() => {
    if (centroid) {
      return geoMercator()
        .center(centroid as [number, number])
        .scale(300000)
        .translate([330, 225]);
    } else {
      return geoMercator()
        .center([8.5417, 47.3769])
        .scale(200000)
        .translate([330, 225]);
    }
  }, [centroid]);

  const area = useMemo(() => {
    if (coords) {
      return geoPath()
        .projection(projection)
        .area(coords as GeoGeometryObjects);
    }
    return 0;
  }, [coords, projection]);

  // A path generator
  const pathGenerator = useMemo(
    () => geoPath().projection(projection),
    [projection]
  );

return (
    <motion.div
    layout
    transition={{duration:0.5, ease: "easeInOut"}}>
        <svg
                viewBox="0 0 800 400"
                overflow="visible"
              >
                <g>
                  {scales.map((scale, index) => (
                      <path
                       key={index}
                        d={
                          pathGenerator(coords as GeoPermissibleObjects) ??
                          "M0,0"
                        }
                         fill={index === 0 ? "darkblue" : "none"}
                        stroke={"darkblue"}
                        strokeWidth={1.2}
                         transform={`translate(${600 / 2}, ${
                                          400 / 2
                                        }) scale(${scale}) translate(${-600 / 2}, ${-400 / 2})`}
                      />
                        ))}
                </g>
              </svg>
         </motion.div>
);
}