"use client";

import {Box, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const ChartContainer = ({ chart }: Pick<DetailTypes, 'chart'>) => {
const theme = useTheme();

 return (

    <Box
    sx={{
        background: theme.palette.secondary.main,
        width: "100%",
        height: "100%",
        p: "4rem",
    }}
    >
        {chart}
    </Box>
 );

}