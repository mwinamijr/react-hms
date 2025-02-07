import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
//import { logout } from "../features/user/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AccountBalance as FinanceIcon,
  ExitToApp as LogoutIcon,
  ExpandLess,
  ExpandMore,
  LocalHospital as HospitalIcon,
  Healing as TreatmentIcon,
  Payments as PaymentIcon,
  Inventory as PharmacyIcon,
  Assignment as ReportIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    console.log("Logged out!!!");
    // dispatch(logout());
    navigate("/");
  };

  // Toggle submenu open/close
  const handleMenuToggle = (menuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    {
      label: "Patient Management",
      icon: <PeopleIcon />,
      children: [
        { label: "Register Patient", path: "/patients/register" },
        { label: "Assign Visit", path: "/patients/visit" },
        { label: "Assign Department", path: "/patients/department" },
      ],
    },
    {
      label: "Medical Process",
      icon: <HospitalIcon />,
      children: [
        { label: "Vitals", path: "/medical/vitals" },
        { label: "Doctor Assignment", path: "/medical/doctor" },
        { label: "Medical History", path: "/medical/history" },
        { label: "Tests & Results", path: "/medical/tests" },
        { label: "Treatments", path: "/medical/treatment" },
      ],
    },
    {
      label: "Pharmacy",
      icon: <PharmacyIcon />,
      children: [
        { label: "Prescriptions", path: "/pharmacy/prescriptions" },
        { label: "Dispense Medicine", path: "/pharmacy/dispense" },
      ],
    },
    {
      label: "Finance",
      icon: <FinanceIcon />,
      children: [
        { label: "Payments", path: "/finance/payments" },
        { label: "Insurance Claims", path: "/finance/insurance" },
      ],
    },
    { label: "Reports", path: "/reports", icon: <ReportIcon /> },
    { label: "Logout", onClick: logoutHandler, icon: <LogoutIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Hospital Information System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children ? (
                <>
                  <ListItemButton onClick={() => handleMenuToggle(item.label)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {openMenus[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openMenus[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((child, childIndex) => (
                        <ListItemButton
                          key={childIndex}
                          sx={{ pl: 4 }}
                          component={Link}
                          to={child.path}
                        >
                          <ListItemText primary={child.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton
                  component={item.path ? Link : "div"}
                  to={item.path}
                  onClick={item.onClick}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
