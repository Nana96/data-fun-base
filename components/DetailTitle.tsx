"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const DetailTitle = ({ title }: Pick<DetailTypes, 'title'>) => {
const theme = useTheme();

return (
    <Box sx={{
        background: theme.palette.primary.main,
        minHeight: "50vh",
        p: 4,
    }}>
        <Typography variant="h1">
        {title}
        </Typography>
    </Box>
)
}