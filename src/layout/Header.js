import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: "240px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hospital Management System
        </Typography>
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
