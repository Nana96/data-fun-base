"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const CodeContainer = ({ code }: Pick<DetailTypes, 'code'>) => {
const theme = useTheme();

const steps = code.split(/\r?\n/).filter(line => line.trim() !== '');

  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        minHeight: "100vh",
        p: 4
      }}
    >
      {steps.map((step, index) => (
        <Typography key={index} variant="body1" sx={{ mb: 2 }}>
          {index + 1}. {step}
        </Typography>
      ))}
    </Box>
  );
};