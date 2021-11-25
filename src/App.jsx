import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import theme from "./styles/theme";
import "./styles/global.css";
import MainRouter from "./router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
