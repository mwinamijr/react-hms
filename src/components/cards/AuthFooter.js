// material-ui
import { Link, Typography, Stack } from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://mwinamijr.github.io"
      target="_blank"
      underline="hover"
    >
      Designed by - Mwinami Jr
    </Typography>
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://mwinamijr.github.io"
      target="_blank"
      underline="hover"
    >
      &copy; techdometz
    </Typography>
  </Stack>
);

export default AuthFooter;
