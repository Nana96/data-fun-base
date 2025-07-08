"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const DetailTitle = ({ title }: Pick<DetailTypes, 'title'>) => {
const theme = useTheme();

 const [toptitle, description] = title;

  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        minHeight: "10vh",
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {toptitle}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </Box>
  );
};