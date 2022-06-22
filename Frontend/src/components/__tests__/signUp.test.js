import {
  render,
  fireEvent,
  act,
  screen,
  cleanup,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Register from "../auth/Register";
import { AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("Register", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
  });

  afterEach(() => cleanup());

  test("should render the form to Register", async () => {
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  // test("succesful register", async () => {
  //   const firstname = screen.getByLabelText("Nombre");
  //   const lastname = screen.getByLabelText("Apellido");
  //   const email = screen.getByLabelText("Email");
  //   const password = screen.getByLabelText("Contraseña");
  //   const confirm_password = screen.getByLabelText("Confirme su contraseña");
  //   const submit = screen.getByRole("button", { name: "Crear cuenta" });
  //   act(() => {
  //     fireEvent.change(firstname, {
  //       target: {
  //         value: "Qwewe",
  //       },
  //     });
  //     fireEvent.change(lastname, {
  //       target: {
  //         value: "Wasd",
  //       },
  //     });
  //     fireEvent.change(email, {
  //       target: {
  //         value: "qwewewasd@gmail.com",
  //       },
  //     });
  //     fireEvent.change(password, {
  //       target: {
  //         value: "asdasd",
  //       },
  //     });
  //     fireEvent.change(confirm_password, {
  //       target: {
  //         value: "asdasd",
  //       },
  //     });
  //     fireEvent.submit(submit);
  //   });
  //   expect(JSON.parse(localStorage.getItem("user"))).toBeTruthy();
  //   expect(JSON.parse(localStorage.getItem("user"))).toHaveProperty(
  //     "username",
  //     "Qwewe"
  //   );
  // });

  test("validate: name input", async () => {
    const name = screen.getByLabelText("Nombre");
    const submit = screen.getByRole("button", { name: "Crear cuenta" });
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
    const lastName = screen.getByLabelText("Apellido");
    const submit = screen.getByRole("button", { name: "Crear cuenta" });
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
      const email = screen.getByLabelText("Email");
      const submit = screen.getByRole("button", { name: "Crear cuenta" });
      act(() => {
        fireEvent.submit(submit);
      });
      expect(
        screen.getByText("Por favor ingresa tu email.")
      ).toBeInTheDocument();
    });
    test("validate: email input to be valid 1", async () => {
      const email = screen.getByLabelText("Email");
      const submit = screen.getByRole("button", { name: "Crear cuenta" });

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
      const email = screen.getByLabelText("Email");
      const submit = screen.getByRole("button", { name: "Crear cuenta" });

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
      const email = screen.getByLabelText("Email");
      const submit = screen.getByRole("button", { name: "Crear cuenta" });

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
      const email = screen.getByLabelText("Email");
      const submit = screen.getByRole("button", { name: "Crear cuenta" });

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

  // test("validate: password input", async () => {
  //   const password = screen.getByLabelText("Contraseña");
  //   const submit = screen.getByRole("button", { name: "Crear cuenta" });
  //   act(() => {
  //     fireEvent.submit(submit);
  //   });
  //   expect(
  //     screen.getByText("Por favor ingresa tu contraseña.")
  //   ).toBeInTheDocument();

  //   act(() => {
  //     fireEvent.change(password, {
  //       target: {
  //         value: "12345",
  //       },
  //     });
  //     fireEvent.submit(submit);
  //   });
  //   expect(
  //     screen.getByText("La contraseña debe tener al menos 6 caracteres.")
  //   ).toBeInTheDocument();
  // });

  test("validate: password confirmation input", async () => {
    const password = screen.getByLabelText("Contraseña");
    const passwordConfirmation = screen.getByLabelText(
      "Confirme su contraseña"
    );
    const submit = screen.getByRole("button", { name: "Crear cuenta" });
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
