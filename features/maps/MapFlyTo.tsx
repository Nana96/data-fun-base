import { useMap } from "react-leaflet";
import { useEffect } from "react";
import {MapFlyToProps} from "@/types/types"

export const MapFlyTo = ({ coords }: MapFlyToProps) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 10); // zoom to coordinates
    }
  }, [coords, map]);
  return null;
};