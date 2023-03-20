import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, logout } from "@root/store/auth";
import AppMenu from "@root/components/AppMenu";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function MyAppBar() {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };

  const onLogout = () => {
    dispatch(logout());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButton = isAuth ? (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={handleClick}
    >
      <MenuIcon />
    </IconButton>
  ) : undefined;

  const authButton = !isAuth ? (
    <Button color="inherit" onClick={onLogin}>
      Login
    </Button>
  ) : (
    <Button color="inherit" onClick={onLogout}>
      Logout
    </Button>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {menuButton}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          {authButton}
        </Toolbar>
      </AppBar>
      <AppMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </Box>
  );
}
