import {
  render,
  fireEvent,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { BrowserRouter as Router } from "react-router-dom";
import Buscador from "../buscador/Buscador";
import { ContextProvider } from "../../contexts/ContextProvider";

let component = null;

describe("Buscador", () => {
  beforeEach(() => {
    // component = render(
    //   <Router>
    //     <ContextProvider>
    //       <Buscador />
    //     </ContextProvider>
    //   </Router>
    // );
  });

  afterEach(() => cleanup());

//   test("should render the element", () => {
//     expect(
//       screen.getByText("Busca ofertas en hoteles, casas y mucho más")
//     ).toBeInTheDocument();
//   });

  // test("should render list when clicking locations selector", async () => {
  //   const locations = screen.getByRole("button", { name: "¿A dónde vamos?" });
  //   act(() => {
  //     fireEvent.click(locations);
  //   });
  //   expect(screen.getAllByRole("listitem")).not.toHaveLength(0);
  // });
  
//   test("should render calendar when clicking date selector", async () => {
//     const calendar = screen.getByRole("button", {
//       name: "Check in - Check out",
//     });
//     act(() => {
//       fireEvent.click(calendar);
//     });
//     expect(calendar.childNodes[2]).toBeVisible();
//   });
});
