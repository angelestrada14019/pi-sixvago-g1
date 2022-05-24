import { Outlet } from "react-router-dom";
import Buscador from "./components/body/buscador/Buscador";
import Main from "./components/body/Main";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Buscador />
      <Outlet />
      <Main />
      <Footer />
    </>
  );
}

export default App;
