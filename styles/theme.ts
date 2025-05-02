"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b8a9a3", // beige
    },
    secondary: {
      main: "#00FF85", // green
      light: "rgba(0, 255, 133, 0.3)",
    },
    text: {
      primary: "#000042", // blue
      secondary: "#666666",
    },
    background: {
      default: "#b8a9a3",
    },
  },
  typography: {
    fontFamily: "'Avenir'",
    h1: {
      fontSize: "2.2rem",
      fontWeight: 200,
      fontFamily: "'Cormorant Infant'",
    },
    h2: {
      fontSize: "3.5rem",
      fontWeight: 300,
      fontFamily: "'Cormorant Infant'",
    },
    /**body: {
      fontSize: "1.1rem",
      fontWeight: 400,
      fontFamily: "'Avenir'",
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },**/
  },
});

export default theme;