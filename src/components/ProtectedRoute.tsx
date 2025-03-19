
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type UserRole = 'admin' | 'hr' | 'job_seeker';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, userRole, hasPermission } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
      return;
    }

    // Redirect users after login based on their role
    if (!loading && user && !allowedRoles) {
      // If no specific roles are required but user is authenticated
      if (userRole === 'admin') {
        navigate("/admin");
      } else if (userRole === 'hr') {
        navigate("/hr");
      } else if (userRole === 'job_seeker') {
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate, userRole, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check for role-based access if allowedRoles are specified
  if (user && allowedRoles && !hasPermission(allowedRoles)) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md">
          <AlertDescription className="py-4">
            <p className="mb-4">You don't have permission to access this page.</p>
            <Button onClick={() => {
              if (userRole === 'admin') {
                navigate("/admin");
              } else if (userRole === 'hr') {
                navigate("/hr");
              } else {
                navigate("/");
              }
            }} variant="outline">
              Return to Dashboard
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
