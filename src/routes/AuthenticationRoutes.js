import MinimalLayout from "../layout/MinimalLayout";

import AuthLogin from "../pages/authentcation/Login";
import AuthRegister from "../pages/authentcation/Register";

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "authentication/Login",
      element: <AuthLogin />,
    },
    {
      path: "authentication/Register",
      element: <AuthRegister />,
    },
  ],
};

export default AuthenticationRoutes;
