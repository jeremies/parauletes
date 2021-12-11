import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import "./AppBarHome.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function AppBarHome() {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  };

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
          Configuració
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarHome;
