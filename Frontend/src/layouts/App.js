import { Outlet } from "react-router-dom";
import { ContextProvider } from "../contexts/ContextProvider";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ContextProvider>
          <CssBaseline />
          <Header />
          <Outlet />
          <Footer />
        </ContextProvider>
      </AuthProvider>
    </>
  );
}

export default App;
