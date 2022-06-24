import {
  render,
  fireEvent,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../header/Header";
import { useContext } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { ContextProvider } from "../../contexts/ContextProvider";
import {FormularioReserva} from "../../components/booking_form/FormularioReserva";

describe("FormularioReserva", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <ContextProvider>
          <FormularioReserva />
          </ContextProvider>
        </AuthProvider>
      </Router>
    );
  });

  afterEach(() => cleanup());

  test('click on "confirmar reserva" should show It should show successful booking page', () => {
    const bntConfirmar = screen.getByRole("button", {
      name: "confirmar reserva",
    });

    act(() => {
      fireEvent.click(bntConfirmar);
    });

    const divPadre = screen.getByText("confirmar reserva");
    expect(divPadre.classList.contains("show")).toBe(false);
  });

  test("it should show time options", () => {
    expect(screen.getByText("Tu horario de llegada")).toBeInTheDocument();
  });

  //validar boton reserva(que redirecciona a login o pagina reserva)

  test("should render reservaPagination", async () => {
    const buttonReserva = screen.getByRole("button", { name: "Reservar" });
    const { validateToken } = useContext(AuthProvider);

    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWdhQGZyYW5jby5jb20iLCJpYXQiOjE2NTU5OTYwMjUsImV4cCI6MTY1NjAyNDgyNX0.G4zc7wEvAv2811HHnl8npwxbRnd-WAyug9WyBhYGBI8McS82Oq2IB_nULVpvgfEeEdrgTY6flPquawX_Wp-KJA";
    localStorage.setItem("token", JSON.stringify(token));

    act(() => {
      fireEvent.click(buttonReserva);
    });

    if (validateToken()) {
      //url reserva
      window.location.pathname.toBe("/reservas");
    }
  });

  test("sould render form-login", async () => {
    const buttonReserva = screen.getByRole("button", { name: "Reservar" });
    const { validateToken } = useContext(AuthProvider);

    act(() => {
      fireEvent.click(buttonReserva);
    });

    if (!validateToken()) {
      //url login
      window.location.pathname.toBe("/login");
    }
  });
});
