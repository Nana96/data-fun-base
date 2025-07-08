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
        p: 4,
      }}
    >
    <Typography variant="body1" component="span" sx={{ fontWeight: "bold" }}>
      Approach
    </Typography>
      <ol style={{ paddingLeft: "1.5rem" }}>
        {code.map((item, i) => (
          <li key={i}>
            <Typography variant="body1" component="span">
              {item}
            </Typography>
          </li>
        ))}
      </ol>
    </Box>
  );
};