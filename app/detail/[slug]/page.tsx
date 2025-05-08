"use client";

import React from "react";
import { pages } from "@/data/detail_pages";
import { notFound } from "next/navigation";
import { DetailsLayout } from "@/components/DetailsLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Box, Typography, useTheme} from "@mui/material";
import Link from "next/link";

export default function DetailPage(props: any) {
  const { slug } = React.use(props.params);
  const theme = useTheme();

  const page = pages.find((p) => p.slug === slug);
  if (!page) return notFound();

  return (
     <>
         <Link href="/" style={{ display: "inline-flex", alignItems: "center", marginBottom: "1rem", textDecoration: "none" }}>
           <ArrowBackIcon style={{ marginRight: 10 }} />
            <Typography variant="body1">Overview</Typography>
         </Link>
         <DetailsLayout
           title={page.title}
           chart={page.chart}
           code={page.code}
         />
       </>
  );
}
