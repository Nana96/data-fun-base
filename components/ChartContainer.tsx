"use client";

import {Box, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const ChartContainer = ({ chart }: Pick<DetailTypes, 'chart'>) => {
const theme = useTheme();

 return (

    <Box
    sx={{
        background: theme.palette.primary.main,
        border: 1,
        borderColor: theme.palette.text.primary,
        width: "100%",
        height: "100%",
    }}
    >
        {chart}
    </Box>
 );

}