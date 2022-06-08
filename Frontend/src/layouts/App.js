import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";


function App(props) {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
      
    </>
  );
}

export default App;
