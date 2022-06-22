import {
  render,
  fireEvent,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "../body/Main";
import { ContextProvider } from "../../contexts/ContextProvider";

describe("Body", () => {
  beforeEach(() => {
    render(
      <Router>
        <ContextProvider>
          <Main />
        </ContextProvider>
      </Router>
    );
  });

  afterEach(() => cleanup());

  test("should render categories", () => {
    expect(
      screen.getByText("Buscar por tipo de alojamiento")
    ).toBeInTheDocument();
  });

  // test("should render cards", async () => {
  //   await expect(screen.getByText("Recomendaciones")).toBeInTheDocument();
  // });

});
