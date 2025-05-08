"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const CodeContainer = ({ code }: Pick<DetailTypes, 'code'>) => {
const theme = useTheme();

return (
    <Box
    sx={{
        background: theme.palette.primary.main,
        minHeight: "100vh",
        p: 4
    }}
    >
        <Typography variant="body1">
        {code}
        </Typography>
    </Box>
)
}