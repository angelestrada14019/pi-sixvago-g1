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
  
  test("should render cards", () => {
    expect(screen.getByText("Recomendaciones")).toBeInTheDocument();
  });

  test("pagination should render new cards", () => {
    const next = screen.getByLabelText("Next page");
    const imgs = screen.getAllByRole("img");
    act(() => {
      fireEvent.click(next);
    });
    expect(screen.getAllByRole("img")).not.toContain(imgs);
  });

  test("should render new cards when clicking a category", () => {
    const category = screen
      .getByText("Buscar por tipo de alojamiento")
      .nextElementSibling.firstChild
    const imgs = screen.getAllByRole("img");
    act(() => {
      fireEvent.click(category);
    });
    expect(screen.getAllByRole("img")).not.toContain(imgs);
  });
});
