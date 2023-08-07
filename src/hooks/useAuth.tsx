import { useMemo } from "react";
import { useAppSelector } from "@app/store";

export const useAuth = () => {
  const { isError, isLoading, isSuccess, isAuthenticated, jwt, user } = useAppSelector((state) => state.auth);

  return useMemo(
    () => ({ isError, isLoading, isSuccess, isAuthenticated, jwt, user }),
    [isError, isLoading, isSuccess, isAuthenticated, jwt, user]
  );
};
