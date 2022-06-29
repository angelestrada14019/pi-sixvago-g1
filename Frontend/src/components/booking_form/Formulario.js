import { useState } from "react";
import { Formik } from "formik";
import "./form.css";
import { useStateContext } from "../../contexts/ContextProvider";

const Formulario = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    ciudad: "",
    hora: "",
  });
  const { setReservaP,reservaP } = useStateContext();
  return (
    <>
      <h2 className="section-h2">Completá tus datos</h2>
      <Formik
        initialValues={usuario}
        validate={(valores) => {
        //   localStorage.setItem("ciudadReserva", valores.ciudad);
          setReservaP({
               ...reservaP,
               ciudadReserva: valores.ciudad,
          })
          let errores = {};
          if (!valores.ciudad) {
            console.log("el nombre es obligatorio");
          }
        }}
        onSubmit={(valores) => {
          console.log("Formulario enviado", valores);
        }}
      >
        {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
          <form className="formulario" onSubmit={handleSubmit}>
            <div id="form-group" className="clearfix">
              <div className="form-row">
                <div className="column-half">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    disabled
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese  su nombre"
                    value={user.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="column-half">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    disabled
                    id="apellido"
                    name="apellido"
                    placeholder="Ingrese  su apellido"
                    value={user.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="column-half">
                  <label htmlFor="correo">Email</label>
                  <input
                    type="email"
                    disabled
                    id="correo"
                    name="correo"
                    placeholder="Ingrese correo Electronico"
                    value={user.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="column-half">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input
                    type="text"
                    required
                    id="ciudad"
                    name="ciudad"
                    placeholder="Ingrese su ciudad"
                    value={values.ciudad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>

      <div>
        <h2 className="section-h2">Seleccioná tu fecha de reserva</h2>
      </div>
    </>
  );
};
export default Formulario;
