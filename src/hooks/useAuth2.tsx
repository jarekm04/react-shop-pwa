import { useContext } from "react";
import { AuthContext } from "@providers/AuthProvider";

export const useAuth2 = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
