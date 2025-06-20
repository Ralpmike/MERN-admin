import { useAuth } from "@/context/auth-context";
// import { useEffect } from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Check if the user is authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/signin");
  //   }
  // }, [isAuthenticated, navigate]);

  // if (!isAuthenticated) {
  //   return null;
  // }

  return <div>{isAuthenticated ? children : <Navigate to="/signin" />}</div>;
}

export default ProtectedRoute;
