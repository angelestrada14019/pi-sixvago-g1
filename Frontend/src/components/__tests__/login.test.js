import {
  render,
  fireEvent,
  act,
  screen,
  cleanup,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Login from "../auth/Login";


let component = null;

describe("Login", () => {
  beforeEach(() => {
    component = render(<Login />);
  });

  afterEach(() => cleanup());

  test("should render Login", async () => {
    expect(component.container).toBeInTheDocument();
  });

  test("should see an alert if user doesnt exist", async () => {
    const email = screen.getByLabelText("Correo electronico");
    const password = component.getByLabelText("Contraseña");
    const submit = component.getByRole("button", { name: "Ingresar" });
    act(() => {
      fireEvent.change(email, {
        target: {
          value: "asdas@asd.com",
        },
      });
      fireEvent.change(password, {
        target: {
          value: "asdasd",
        },
      });
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText(
        "Ups! Parece que el usuario no existe. Por favor, verifica tus datos."
      )
    ).toBeInTheDocument();
  });
  
});
