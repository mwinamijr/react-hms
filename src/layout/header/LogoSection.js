import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonBase from "@mui/material/ButtonBase";

import logo from "./../../assets/images/techdome.svg";
import config from "./../../config";
import { menuOpen } from "./../../store/slices/customizationSlice"; // Assuming you moved actions to slices

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();

  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch(menuOpen(defaultId))}
      component={Link}
      to={config.defaultPath}
    >
      <img src={logo} alt="Techdometz" width="50" />
    </ButtonBase>
  );
};

export default LogoSection;
