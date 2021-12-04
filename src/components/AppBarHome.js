import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "./AppBarHome.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function AppBarHome(props) {
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const menuOpen = Boolean(anchorElMenu);
  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const [anchorElOptions, setAnchorElOptions] = useState(null);
  const optionsOpen = Boolean(anchorElOptions);
  const handleClickOptions = (event) => {
    setAnchorElOptions(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorElOptions(null);
  };
  const onClickCopy = () => {
    handleCloseOptions();
    props.onClickCopy();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClickMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorElMenu} open={menuOpen} onClose={handleCloseMenu}>
          <MenuItem onClick={handleCloseMenu} component={Link} to="settings">
            Configuració
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
        </Menu>
        <img src={logo} className="icon" alt="logo" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Parauletes
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          sx={{ ml: 2 }}
          onClick={handleClickOptions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElOptions}
          open={optionsOpen}
          onClose={handleCloseOptions}
        >
          <MenuItem onClick={onClickCopy}>Copiar</MenuItem>
          <MenuItem onClick={handleCloseOptions}>Compartir</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarHome;
