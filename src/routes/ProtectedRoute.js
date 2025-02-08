import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { useEffect } from "react";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.getUsers); // Access userInfo from the Redux store

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login page if userInfo is not available (not authenticated)
      return null; // Return null or a loading spinner while redirecting
    }
  }, [navigate, userInfo]);

  return element; // If user is authenticated, render the protected element
};

export default ProtectedRoute;
