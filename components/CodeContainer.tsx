"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const CodeContainer = ({ code }: Pick<DetailTypes, 'code'>) => {
const theme = useTheme();

return (
    <Box
    sx={{
        background: theme.palette.primary.main,
        p: "50px",
    }}
    >
        <Typography variant="body1">
        {code}
        </Typography>
    </Box>
)
}