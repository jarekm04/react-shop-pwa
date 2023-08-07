import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { cleanup, render as rtlRender } from "@testing-library/react";
import { authSlice } from "@features/auth/slicers/authSlice";

afterEach(() => {
  cleanup();
});

interface RenderOptions {
  preloadedState?: object;
  store?: EnhancedStore;
}

function reducer(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: { auth: authSlice.reducer }, preloadedState }),
    ...renderOptions
  }: RenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { reducer };
