import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#8e63a3",
      main: "#8e63a3",
      dark: "#31184b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      default: "#5c3977",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="3799573384-pmvn183k0cfrmntb4bsorrdjurg9mh5t.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
