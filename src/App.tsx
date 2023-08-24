import { ThemeProvider } from "@mui/material";
import { theme } from "@utils/theme";
import RootProvider from "./providers/RootProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RootProvider />
    </ThemeProvider>
  );
}

export default App;
