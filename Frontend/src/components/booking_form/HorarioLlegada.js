import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "./Horariollegada.css";
import { useStateContext } from "../../contexts/ContextProvider";

const HorarioLlegada = () => {
  const { setReservaP, reservaP } = useStateContext();
  return (
    <>
      <Formik
        initialValues={{
          hora: "Selecciona hora",
        }}
        validate={(valores) => {
          // localStorage.setItem("horarioReserva",valores.hora)
          setReservaP({
            ...reservaP,
            horarioReserva: valores.hora,
          });
        }}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <form className="formulario" onSubmit={handleSubmit}>
            <div id="form-group" class="clearfix">
              <div className="descripcion">
                <p>
                  {" "}
                  Tu habitacion va a estar lista para el check-in entre las
                  10:00 AM y las 11:00 PM
                </p>
              </div>

              <div className="form-hora">
                <div className="descripcion">
                  <p> Indicá tu posible fecha de llegada</p>
                </div>
                <div className="form-group">
                  <select
                    id="hora"
                    name="hora"
                    onChange={handleChange}
                    value={values.hora}
                  >
                    <option value="Selecciona hora">Selecciona hora</option>
                    <option value="01:00:00">01:00 AM</option>
                    <option value="02:00:00">02:00 AM</option>
                    <option value="03:00:00">03:00 AM</option>
                    <option value="04:00:00">04:00 AM</option>
                    <option value="05:00:00">05:00 AM</option>
                    <option value="06:00:00">06:00 AM</option>
                    <option value="07:00:00">07:00 AM</option>
                    <option value="08:00:00">08:00 AM</option>
                    <option value="09:00:00">09:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="13:00:00">01:00 PM</option>
                    <option value="14:00:00">02:00 PM</option>
                    <option value="15:00:00">03:00 PM</option>
                    <option value="16:00:00">04:00 PM</option>
                    <option value="17:00:00">05:00 PM</option>
                    <option value="18:00:00">06:00 PM</option>
                    <option value="19:00:00">07:00 PM</option>
                    <option value="20:00:00">08:00 PM</option>
                    <option value="21:00:00">09:00 PM</option>
                    <option value="22:00:00">10:00 PM</option>
                    <option value="23:00:00">11:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* <label>


                            <select name="hora" value={values.hora} onChange={handleChange}>
                                <option value="24">Seleccionar hora</option>
                                {Array.from(Array(24).keys()).map(i => (
                                    <option key={i} value={i}>{i}</option>

                                ))}
                            </select>
                        </label> */}
          </form>
        )}
      </Formik>
    </>
  );
};

export default HorarioLlegada;
