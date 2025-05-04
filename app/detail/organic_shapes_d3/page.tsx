/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Head from "next/head";
import {DetailsLayout} from "@/components/DetailsLayout";
import {LeafletScroller} from "@/components/LeafletMap";

const Page = () => {
  return (
    <>
      <DetailsLayout
      title={"Connecting to OpenStreetMap"}
      chart={<LeafletScroller />}
      code={"Trees play a central role in the urban environment: They offer shade, produce oxygen and purify the air, which contributes to an improved sense of well-being in the city. As contemporary witnesses, they reflect the history of the city. <br />. Trees play a central role in the urban environment: They offer shade, produce oxygen and purify the air, which contributes to an improved sense of well-being in the city. As contemporary witnesses, they reflect the history of the city. <br /> "}
      />
    </>
  );
};
export default Page;