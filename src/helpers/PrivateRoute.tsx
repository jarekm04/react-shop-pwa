import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const { isAuthenticated, jwt, verifyJwt } = useAuth();

  useEffect(() => {
    if (!jwt || !jwt.token) return;

    verifyJwt(jwt.token);
  }, [jwt]);

  return isAuthenticated ? page : <Navigate replace to='/signin' />;
};

export default PrivateRoute;
