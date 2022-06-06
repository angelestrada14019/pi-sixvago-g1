import {
  render,
  fireEvent,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { prettyDOM } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../layouts/App";

let component = null;

describe("Header", () => {
  beforeEach(() => {
    component = render(
      <Router>
        <App />
      </Router>
    );
  });

  afterEach(() => cleanup());

  test("header is rendered", async () => {
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  test('click on "logo" should redirect to "/"', async () => {
    const history = createMemoryHistory();
    history.push("producto/1");

    act(() => {
      fireEvent.click(screen.getByAltText("logo"));
    });

    expect(window.location.pathname).toBe("/");
  });

  test('click on "Iniciar Sesion" should hide button', async () => {
    const login = screen.getByRole("button", { name: "Iniciar sesion" });

    act(() => {
      fireEvent.click(login);
    });

    expect(login).not.toBeVisible();
  });

  test('click on "Crear cuenta" should hide button', async () => {
    const signUp = component.container.querySelector("#crear");

    act(() => {
      fireEvent.click(signUp);
    });

    expect(signUp).not.toBeVisible();
  });

  test('click on "Iniciar Sesion" should show login', async () => {
    const loginButton = screen.getByRole("button", { name: "Iniciar sesion" });

    act(() => {
      fireEvent.click(loginButton);
    });

    const form = screen.getByText("Iniciar sesion").parentNode.parentNode;
    expect(form.classList.contains("show")).toBe(true);
  });

  test("footer is rendered", async () => {
    expect(screen.getByText("©2022 Sixvago")).toBeInTheDocument();
  });
});
