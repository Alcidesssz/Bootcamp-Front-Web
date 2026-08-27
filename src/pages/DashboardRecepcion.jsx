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
    const { data: turnos, setData: setTurnos, isLoading } = useFetch('/turnos')

    const turnosFiltrados = turnos.filter(turno =>
    turno.Paciente.Nombre.toLocaleLowerCase().includes(busqueda.toLowerCase())
    );

    const marcarAtendido = async (idturno) => {
        try {
            await clientesAxios.patch(`/turnos/${idturno}`)

        const turnosActualizados = turnos.map(turno => {
            if (turno.id === idturno) return { ...turno, estado: "Atendido" };
            return turno;
        });
        setTurnos(turnosActualizados);
    } catch (error) {
        console.error(error)
        toast.error("Error de Red")
    };
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Turnos del día</h2>

            <BuscadorTurnos valor={busqueda} alCambiar={setBusqueda} />

            <Row>

                {isLoading ? (
                    [1, 2, 3, 4].map (item => <TurnoCardSkeleton key={item} />) 
                ) : turnos.length === 0 ? (

                        <p>No se encontraron turnos pendientes.</p>

                ):
                turnosFiltrados.map((turno) => (
                    <TurnoCard
                    key={turno.id}
                    turno={turno}
                    onAtender={marcarAtendido}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default DashboardRecepcion