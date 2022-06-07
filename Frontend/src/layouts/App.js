import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { ContextProvider } from "../contexts/ContextProvider";
function App() {
  return (
    <>
    <ContextProvider>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </ContextProvider>
    </>
  );
}

export default App;
