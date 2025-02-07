// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import menuItems from "../menu-items";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  // Iterate over menu items and render according to their type
  const navItems = menuItems?.items?.map((item) => {
    // Check the type of item and render accordingly
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error: Unknown type - {item.type}
          </Typography>
        );
    }
  });

  return (
    <>
      {navItems || (
        <Typography variant="h6" color="error" align="center">
          Menu Items not found.
        </Typography>
      )}
    </>
  );
};

export default MenuList;
