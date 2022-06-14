import { Outlet } from "react-router-dom";
import { ContextProvider } from "../contexts/ContextProvider";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import CssBaseline from "@mui/material/CssBaseline";

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
