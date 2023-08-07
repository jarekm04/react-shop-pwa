import { useAppDispatch } from "@app/store";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyJwt } from "../slicers/authSlice";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const { isAuthenticated, jwt } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt || !jwt.token) return;

    dispatch(verifyJwt(jwt.token));
  }, [dispatch, jwt]);

  return isAuthenticated ? page : <Navigate replace to='/signin' />;
};

export default PrivateRoute;
