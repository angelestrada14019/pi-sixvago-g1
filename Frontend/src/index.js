import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Producto from "./pages/Producto";
import App from "./layouts/App";
import NotFound from "./pages/NotFound";
import Reserva from "./pages/Reserva";
import ReservaExitosa from "./pages/ReservaExitosa";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./utils/ScrollToTop";
import Administracion from "./pages/Administracion";
import Verify from "./pages/Verify";
import CreacionProductoExitoso from "./pages/CreacionProductoExitoso";
import MisReservas from "./pages/MisReservas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" />
          <Route path="signUp" />
          <Route index element={<Home />} />
          <Route path="buscar" element={<Home />} />
          <Route
            path="user/:id/mireserva"
            element={<ProtectedRoute children={<MisReservas />} />}
          />
          <Route
            path="administracion"
            element={<ProtectedRoute children={<Administracion />} />}
          />
          <Route
            path="administracion/productoExitoso"
            element={<CreacionProductoExitoso />}
          />
          <Route path="producto">
            <Route path=":id" element={<Producto />} />
            <Route
              path=":id/reserva"
              element={<ProtectedRoute children={<Reserva />} />}
            />
            <Route
              path=":id/reserva/reservaExitosa"
              element={<ProtectedRoute children={<ReservaExitosa />} />}
            />
          </Route>
        </Route>
          <Route path="verify" element={<Verify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
