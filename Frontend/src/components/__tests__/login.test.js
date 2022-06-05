import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Login from "../auth/Login";
import "@testing-library/jest-dom/extend-expect";

let component = null;

describe("Login", () => {
  beforeEach(() => {
    component = render(<Login />);
  });

  afterEach(() => cleanup());

  test("should render Login", async () => {
    expect(component.container).toBeInTheDocument();
  });

  test("email input should validate missing @", async () => {
    const email = component.getByLabelText("Correo electronico");
    const password = component.getByLabelText("Contraseña");
    fireEvent.change(email, {
      target: {
        value: "gabs@gmail.com",
      },
    });
    fireEvent.change(password, {
      target: {
        value: "asdasd",
      },
    });
    const ingresar = component.getByRole("button", { name: "Ingresar" });
    fireEvent.submit(ingresar);
    expect(email).toBeInTheDocument();
  });

  test("email input should validate missing .com", async () => {
    const email = component.getByLabelText("Correo electronico");
    const password = component.getByLabelText("Contraseña");
    fireEvent.change(email, {
      target: {
        value: "gabs@gmail",
      },
    });
    fireEvent.change(password, {
      target: {
        value: "asdasd",
      },
    });
    const ingresar = component.getByRole("button", { name: "Ingresar" });
    fireEvent.submit(ingresar);
  });
});
