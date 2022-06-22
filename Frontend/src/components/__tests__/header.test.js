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
import { AuthProvider } from "../../contexts/AuthContext";
import { ContextProvider } from "../../contexts/ContextProvider";

describe("Header", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <ContextProvider>
            <Header />
          </ContextProvider>
        </AuthProvider>
      </Router>
    );
  });

  afterEach(() => cleanup());

  test('click on "Iniciar Sesion" should show login', () => {
      const loginButton = screen.getByRole("button", { name: "Iniciar sesion" });

      act(() => {
        fireEvent.click(loginButton);
      });

      const divPadre = screen.getByText("Iniciar sesion").parentNode.parentNode;
      expect(divPadre.classList.contains("show")).toBe(true);
  });
});
