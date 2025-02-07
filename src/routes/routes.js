import { createHashRouter } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./AuthenticationRoutes";

const router = createHashRouter([MainRoutes, LoginRoutes], {
  basename: "/",
});

export default router;
