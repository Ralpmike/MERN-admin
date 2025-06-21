import { useAuth } from "@/context/auth-context";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen backdrop:blur">
        <Loader className="animate-spin w-12 h-12" />
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
