import {
  render,
  fireEvent,
  act,
  screen,
  cleanup,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Register from "../auth/Register";

let component = null;

describe("Register", () => {
  beforeEach(() => {
    component = render(<Register />);
  });

  afterEach(() => cleanup());

  test("should render the form to Register", async () => {
    const form = component.getByRole("form");
    expect(form).toBeInTheDocument();
  });


  test("succesful register", async () => {
    const firstname = component.getByLabelText("Nombre");
    const lastname = component.getByLabelText("Apellido");
    const email = component.getByLabelText("Email");
    const password = component.getByLabelText("Contraseña");
    const confirm_password = component.getByLabelText("Confirme su contraseña");
    const submit = component.getByRole("button", { name: "Crear cuenta" });
    act(() => {
      fireEvent.change(firstname, {
        target: {
          value: "Qwewe",
        },
      });
      fireEvent.change(lastname, {
        target: {
          value: "Wasd",
        },
      });
      fireEvent.change(email, {
        target: {
          value: "qwewewasd@gmail.com",
        },
      });
      fireEvent.change(password, {
        target: {
          value: "asdasd",
        },
      });
      fireEvent.change(confirm_password, {
        target: {
          value: "asdasd",
        },
      });
      fireEvent.submit(submit);
    });
    expect(JSON.parse(localStorage.getItem("user"))).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("user"))).toHaveProperty(
      'username',
      "Qwewe"
    );
  });

  test("validate: name input", async () => {
    const name = component.getByLabelText("Nombre");
    const submit = component.getByRole("button", { name: "Crear cuenta" });
    act(() => {
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Por favor ingresa tu nombre.")
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(name, {
        target: {
          value: "^@#!@#{}",
        },
      });
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Por favor ingresa un nombre valido.")
    ).toBeInTheDocument();
  });

  test("validate: last name input", async () => {
    const lastName = component.getByLabelText("Apellido");
    const submit = component.getByRole("button", { name: "Crear cuenta" });
    act(() => {
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Por favor ingresa tu apellido.")
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(lastName, {
        target: {
          value: "^@#!@#{}",
        },
      });
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Por favor ingresa un apellido valido.")
    ).toBeInTheDocument();
  });

  describe("validate: email input", () => {
    test("validate: email input cant be empty", async () => {
      const email = component.getByLabelText("Email");
      const submit = component.getByRole("button", { name: "Crear cuenta" });
      act(() => {
        fireEvent.submit(submit);
      });
      expect(
        screen.getByText("Por favor ingresa tu email.")
      ).toBeInTheDocument();
    });
    test("validate: email input to be valid 1", async () => {
      const email = component.getByLabelText("Email");
      const submit = component.getByRole("button", { name: "Crear cuenta" });

      act(() => {
        fireEvent.change(email, {
          target: {
            value: "asdasd",
          },
        });
        fireEvent.submit(submit);
      });

      expect(
        screen.getByText("Por favor ingresa un email valido.")
      ).toBeInTheDocument();
    });
    test("validate: email input to be valid 2", async () => {
      const email = component.getByLabelText("Email");
      const submit = component.getByRole("button", { name: "Crear cuenta" });

      act(() => {
        fireEvent.change(email, {
          target: {
            value: "asdasd@",
          },
        });
        fireEvent.submit(submit);
      });

      expect(
        screen.getByText("Por favor ingresa un email valido.")
      ).toBeInTheDocument();
    });
    test("validate: email input to be valid 3", async () => {
      const email = component.getByLabelText("Email");
      const submit = component.getByRole("button", { name: "Crear cuenta" });

      act(() => {
        fireEvent.change(email, {
          target: {
            value: "asdasd@asdasd",
          },
        });
        fireEvent.submit(submit);
      });

      expect(
        screen.getByText("Por favor ingresa un email valido.")
      ).toBeInTheDocument();
    });
    test("validate: email input to be valid 3", async () => {
      const email = component.getByLabelText("Email");
      const submit = component.getByRole("button", { name: "Crear cuenta" });

      act(() => {
        fireEvent.change(email, {
          target: {
            value: "asdasd.com",
          },
        });
        fireEvent.submit(submit);
      });

      expect(
        screen.getByText("Por favor ingresa un email valido.")
      ).toBeInTheDocument();
    });
  });

  test("validate: password input", async () => {
    const password = component.getByLabelText("Contraseña");
    const submit = component.getByRole("button", { name: "Crear cuenta" });
    act(() => {
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Por favor ingresa tu contraseña.")
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(password, {
        target: {
          value: "12345",
        },
      });
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("La contraseña debe tener al menos 6 caracteres.")
    ).toBeInTheDocument();
  });

  test("validate: password confirmation input", async () => {
    const password = component.getByLabelText("Contraseña");
    const passwordConfirmation = component.getByLabelText(
      "Confirme su contraseña"
    );
    const submit = component.getByRole("button", { name: "Crear cuenta" });
    act(() => {
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Por favor confirma tu contraseña.")
    ).toBeInTheDocument();

    act(() => {
      fireEvent.change(password, {
        target: {
          value: "123456",
        },
      });
      fireEvent.change(passwordConfirmation, {
        target: {
          value: "12345",
        },
      });
      fireEvent.submit(submit);
    });
    expect(
      screen.getByText("Las contraseñas no coinciden.")
    ).toBeInTheDocument();
  });
});









// const lastName = register.getByLabelText("Apellido");
// const email = register.getByLabelText("Email");
// const password = register.getByLabelText("Contraseña");
// const passwordConfirm = register.getByLabelText("Confirme su contraseña");
