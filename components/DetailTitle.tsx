"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const DetailTitle = ({title}: DetailTypes) => {
const theme = useTheme();

return (
    <Box
    sx={{
        background: theme.palette.primary.main,
        p: "50px",
    }}
    >
        <Typography variant="h1">
        {title}
        </Typography>
    </Box>
)
}