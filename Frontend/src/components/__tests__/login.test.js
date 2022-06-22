import {
  render,
  fireEvent,
  act,
  screen,
  cleanup,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Login from "../auth/Login";
import { AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("Login", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
  });

  afterEach(() => cleanup());

  test("should render Login", async () => {
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  // test("should see an alert if user doesnt exist", async () => {
  //   const email = screen.getByLabelText("Correo electronico");
  //   const password = screen.getByLabelText("Contraseña");
  //   const submit = screen.getByRole("button", { name: "Ingresar" });
  //   act(() => {
  //     fireEvent.change(email, { target: { value: "asd123as@asd.com" } });
  //     fireEvent.change(password, {
  //       target: {
  //         value: "asdasd",
  //       },
  //     });
  //     fireEvent.submit(submit);
  //   });
  //   expect(
  //     screen.getByText(
  //       "Ups! Parece que el usuario no existe. Por favor, verifica tus datos."
  //     )
  //   ).toBeInTheDocument();
  // });
});
