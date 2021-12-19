import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ minHeight: "100vh" }} elevation={12}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
            <Route path="/refresh" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
