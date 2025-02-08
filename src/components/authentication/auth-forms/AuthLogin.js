import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// icons
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// redux actions
import { login } from "../../../store/user/userSlice";

// ============================|| LOGIN ||============================ //

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useSelector((state) => state.getUsers);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard"); // Redirect to dashboard if user is already logged in
    }
  }, [userInfo, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleLogin}>
      <FormControl
        fullWidth
        error={Boolean(error)}
        sx={{ ...theme.typography.customInput }}
      >
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <OutlinedInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
        />
      </FormControl>

      <FormControl
        fullWidth
        error={Boolean(error)}
        sx={{ ...theme.typography.customInput }}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              name="checked"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Typography
          variant="subtitle1"
          color="secondary"
          sx={{ textDecoration: "none", cursor: "pointer" }}
        >
          Forgot Password?
        </Typography>
      </Stack>

      {error && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{error}</FormHelperText>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          disableElevation
          disabled={loading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Box>
    </form>
  );
};

export default Login;
