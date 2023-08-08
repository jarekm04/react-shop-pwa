import { Grid } from "@mui/material";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid sx={{ p: 2 }} container direction='column' justifyContent='flex-start' alignItems='center'>
      <img src='shop-logo-light.png' alt='shop-square' height='150px' />
      <main>{children}</main>
    </Grid>
  );
};

export default AuthLayout;
