import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "../../contexts/ContextProvider";
import { HorarioLlegada } from "../../components/booking_form/HorarioLlegada.js";

describe("HorarioLlegada", () => {
  beforeEach(() => {
    render(
      <Router>
        <ContextProvider></ContextProvider>
        <HorarioLlegada />
      </Router>
    );
  });

  afterEach(() => cleanup());

  test("should render form-group", () => {
    expect(
      screen.getByText("Indica tu horario de llegada")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Indica tu posible fecha de llegada")
    ).toBeInTheDocument();

    expect(screen.getByText("Selecciona hora")).toBeInTheDocument();
  });
});
