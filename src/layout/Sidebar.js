import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/patients">
          <ListItemText primary="Patients" />
        </ListItem>
        <ListItem button component={Link} to="/medical">
          <ListItemText primary="Medical" />
        </ListItem>
        <ListItem button component={Link} to="/finance">
          <ListItemText primary="Finance" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
