import {
    render,
    fireEvent,
    screen,
    cleanup,
    act,
  } from "@testing-library/react";
  import { prettyDOM } from "@testing-library/dom";
  import { BrowserRouter as Router } from "react-router-dom";
  import { ContextProvider } from "../../contexts/ContextProvider";
  
  describe("HorarioLlegada", () =>{
    beforeEach(() => {
        render(
            <Router>
                <ContextProvider>
                </ContextProvider>
                </Router>
        );
    });

    afterEach(() => cleanup());

    test("should render form-group", () =>{
        expect(
            screen.getByText("Indica tu horario de llegada")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Indica tu posible fecha de llegada")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Selecciona hora")
        ).toBeInTheDocument();

    })

  });