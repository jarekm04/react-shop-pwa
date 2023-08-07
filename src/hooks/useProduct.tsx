import { useMemo } from "react";
import { useAppSelector } from "@app/store";

export const useProduct = () => {
  const { isError, isLoading, isSuccess, cart, products } = useAppSelector((state) => state.product);

  return useMemo(
    () => ({ isError, isLoading, isSuccess, cart, products }),
    [isError, isLoading, isSuccess, cart, products]
  );
};
