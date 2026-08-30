import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'; 
import { Container, Row } from 'react-bootstrap';
import { toast } from 'sonner';
import clientesAxios from '../config/axios';

import BuscadorTurnos from '../components/turnos/BuscadorTurnos';
import TurnoCard from '../components/turnos/TurnoCard';
import TurnoCardSkeleton from '../components/turnos/TurnoCardSkeleton';

const DashboardRecepcion = () => {
    const [busqueda, setBusqueda] = useState("");
    const { response: response, data: turnos, setData: setTurnos, isLoading } = useFetch('/turnos')

    const turnosFiltrados = turnos.filter(Turno =>
    Turno.Paciente.Nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())
    );

    const marcarAtendido = async (idTurno) => {
        try {
            await clientesAxios.patch(`/turnos/${idTurno}`)

        const turnosActualizados = turnos.map(Turno => {
            if (Turno.id === idTurno) return { ...Turno, Estado: "Atendido" };
            return Turno;
        });
        setTurnos(turnosActualizados);
    } catch (error) {
        console.error(error)
        toast.error("Error de Red")
    };
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Turnos del día total: {response.total}</h2>

            <BuscadorTurnos valor={busqueda} alCambiar={setBusqueda} />

            <Row>

                {isLoading ? (
                    [1, 2, 3, 4].map (item => <TurnoCardSkeleton key={item} />) 
                ) : turnos.length === 0 ? (

                        <p>No se encontraron turnos pendientes.</p>

                ):
                turnosFiltrados.map((Turno) => (
                    <TurnoCard
                    key={Turno.id}
                    turno={Turno}
                    onAtender={marcarAtendido}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default DashboardRecepcion