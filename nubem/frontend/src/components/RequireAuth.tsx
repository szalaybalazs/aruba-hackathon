import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFromLocation } from "../hooks/useFromLocation";

export const RequireAuth = () => {
  const { user } = useAuth();
  return <ProtectedRoute hasAccess={!!user} redirect="/login" />;
};

const ProtectedRoute = ({
  hasAccess,
  redirect,
}: {
  hasAccess: boolean;
  redirect: string;
}) => {
  const location = useFromLocation();

  if (!hasAccess) {
    return <Navigate to={redirect} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
