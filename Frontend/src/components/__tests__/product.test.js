import {
  render,
  fireEvent,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
import Producto from "../../pages/Producto";

let component = null;

describe("first", () => {
  beforeEach(() => {
    component = render(
      <Router>
        <Producto />
      </Router>
    );
  });

  afterEach(() => cleanup());

  test("Should render imgs", () => {
    expect(screen.getAllByRole("img")).toBeTruthy();
  });
});
