import {
    render,
    fireEvent,
    screen,
    cleanup,
    act,
  } from "@testing-library/react";
  import { prettyDOM } from "@testing-library/dom";
  import { BrowserRouter as Router } from "react-router-dom";
  import Header from "../header/Header";
  import { useContext } from "react";
  import { AuthProvider } from "../../contexts/AuthContext";
  import { ContextProvider } from "../../contexts/ContextProvider";

  describe("Heading", () =>{
    beforeEach(() =>{
        render(
            <Router>
            <AuthProvider>
            <ContextProvider>
                <Header/>
            </ContextProvider>
            </AuthProvider> 
            </Router>
        );
    });

    afterEach(() => cleanup());

    test('click on "confirmar reserva" should show It should show successful booking page', () =>{
        const bntConfirmar = screen.getByRole("button", { name: "confirmar reserva"});

        act(()=>{
            fireEvent.click(bntConfirmar);
        });

        const divPadre = screen.getByText("confirmar reserva");
      expect(divPadre.classList.contains("show")).toBe(false);

    });

    test("it should show time options", () => {
        expect(
            screen.getByText("Tu horario de llegada")
        ).toBeInTheDocument();
    });

    //validar boton reserva(que redirecciona a login o pagina reserva)

    test("should render reservaPagination", async () => {
        const buttonReserva = screen.getByRole("button", {name: "Reservar"});
        const { validateToken } = useContext(AuthProvider);

        const token = {
            
        } 
        localStorage.setItem("token", JSON.stringify(token));

        act(() =>{
            fireEvent.click(buttonReserva);
        });

        if (validateToken()) {
            
        } else {
            const divPadre = screen.getByText("Reservar");
            expect(
            divPadre.classList.contains("show")).toBe(false);
        }
            
        

      });
  })