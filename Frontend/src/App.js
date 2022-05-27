import { Outlet } from "react-router-dom";
import Buscador from "./components/body/buscador/Buscador";
import Main from "./components/body/Main";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Buscador />
      <Outlet />
      <Main />
      <Footer />
    </>
  );
}

export default App;
