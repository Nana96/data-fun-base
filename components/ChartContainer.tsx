"use client";

import {Box, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const ChartContainer = ({chart}: DetailTypes) => {
const theme = useTheme();

 return (

    <Box
    sx={{
        background: theme.palette.secondary.main,
        width: "100%",
        height: "20vh",
        p: "4rem",
    }}
    >
        {chart}
    </Box>
 );

}