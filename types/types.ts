import {type ReactNode} from "react";

// detail layout types
type DetailTypes = {
title: string;
chart: ReactNode;
code: ReactNode;
}

// scrollama step types
export interface StepType {
  id: number;
  coords: [number, number];
  label: string;
}

// types for MapFlyTo-component in leaflet map
export interface MapFlyToProps {
  coords: [number, number];
}

export type StepData = { index: number };

export default DetailTypes;