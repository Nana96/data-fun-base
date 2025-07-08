"use client";

import {Box, Typography, useTheme} from "@mui/material";
import DetailTypes from "@/types/types";

export const DetailInfo = ({ info }: Pick<DetailTypes, 'info'>) => {
const theme = useTheme();

  // Letzter Eintrag = GitHub-Link
  const githubLink = info[info.length - 1];

  // Alles davor = Tools
  const tools = info.slice(0, -1);

  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        minHeight: "50vh",
        p: 4,
      }}
    >
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Tools Spalte */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>Tools</Typography>
          {tools.map((tool, i) => (
            <Typography key={i} variant="body1">
              {tool}
            </Typography>
          ))}
        </Box>

        {/* GitHub-Link Spalte */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>Code</Typography>
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <Typography variant="body1" sx={{ textDecoration: "underline", color: "white" }}>
              {githubLink}
            </Typography>
          </a>
        </Box>
      </Box>
    </Box>
  );
};