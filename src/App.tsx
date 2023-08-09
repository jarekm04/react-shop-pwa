import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import PrivateRoute from "@features/auth/components/PrivateRoute";
import Home from "@pages/Home";
import Register from "@pages/Register";
import SignIn from "@pages/SignIn";
import Cart from "@pages/Cart";
// import { theme } from "@utils/theme";

export const Root = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<PrivateRoute page={<Home />} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Navigate to='/' />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}

export default App;
