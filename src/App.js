import { RouterProvider } from "react-router-dom";

// routing
import router from "./routes/routes";

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
