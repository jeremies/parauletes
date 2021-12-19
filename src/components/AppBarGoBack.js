import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AppBarGoBack() {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={handleClickBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {location.pathname === "/about" ? "Sobre l'App" : ""}
          {location.pathname === "/settings" ? "Configuració" : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarGoBack;
