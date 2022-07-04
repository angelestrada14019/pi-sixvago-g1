import React from 'react'
import "./miReserva.css"

const MiReserva = () => {




    return (
        <div className='container-miReserva'>
            <div className='titulo-miReserva'><h2>Mis reservas</h2></div>
            <div className='card-miReserva'>
                <div className='img-miReserva'>
                </div>
                <div className='datos-miReserva'>
                    <div className='nombre-miReserva'> <h2>Nombre:  </h2> </div>
                    <hr/>
                    <div className='informacion-miReserva'>
                        <p>Categoria: </p>
                        <p>Nombre lugar: </p>
                        <p>N° Habitaciones reservadas: </p>
                    </div>
                    <hr/>
                    <div className='check-miReserva'>
                        <h3>Check in: </h3>
                        <h3>Check out: </h3>
                    </div>
                    <hr/>
                    <div className='covid-miReserva'>
                        <p>Hora de reserva: </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiReserva