import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Message from "../../components/Message";
import { login } from "../../store/user/userSlice";
import Logo from "../../layout/header/LogoSection";
import AuthFooter from "../../components/cards/AuthFooter";
import AuthWrapper1 from "../../components/authentication/AuthWrapper1";
import AuthCardWrapper from "../../components/authentication/AuthCardWrapper";

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useSelector((state) => state.getUsers);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <AuthWrapper1>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <div onClick={() => (window.location.href = "#")}>
                      {" "}
                      <Logo />{" "}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack alignItems="center" spacing={1}>
                      <Typography
                        color={theme.palette.secondary.main}
                        variant={matchDownSM ? "h3" : "h2"}
                      >
                        Hi, Welcome Back
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize="16px"
                        textAlign={matchDownSM ? "center" : "inherit"}
                      >
                        Enter your credentials to continue
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {error && <Message severity="error">{error}</Message>}
                    <form onSubmit={handleLogin}>
                      <FormControl
                        fullWidth
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
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
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
                            loading ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : null
                          }
                        >
                          {loading ? "Signing in..." : "Sign in"}
                        </Button>
                      </Box>
                    </form>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                    alignItems="center"
                  >
                    <Typography
                      component={Link}
                      to="/pages/register/register3"
                      variant="subtitle1"
                      sx={{ textDecoration: "none" }}
                    >
                      Don&apos;t have an account?
                    </Typography>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
