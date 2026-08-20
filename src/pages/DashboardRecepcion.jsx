import { useState, useEffect } from 'react'
import { Container, Badge, Row, Col, Card, Button } from 'react-bootstrap';
import clientesAxios from '../config/axios';

const DashboardRecepcion = () => {
    const [busqueda, setBusqueda] = useState("");
    const [turnos, setTurnos] = useState([]);

    const turnosFiltrados = turnos.filter(turno =>
    turno.Paciente.Nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {

    const obtenerTurnosDelBackend = async () => {
        try{

            const respuesta = await clientesAxios.get('/turnos');

            setTurnos(respuesta.data.data);
            console.log(respuesta.data.data)

        } catch (error) {
            console.error("hubo un error al sincronizar", error);
        }
    };

    obtenerTurnosDelBackend();

}, []);

    const marcarComoAtendido = (idturno) => {
        const turnosActualizados = turnos.map(turno => {
            if (turno.id === idturno) return { ...turno, estado: "Atendido" };
            return turno;
        });
        setTurnos(turnosActualizados);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Turnos del día</h2>
            <Row className="mb-4">
                <Col md={6}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por paciente..."
                        value={busqueda}
                        onChange={(evento) => setBusqueda(evento.target.value)}
                    />
                </Col>
            </Row>

            <Row>
                {turnos.length === 0 ? (

                        <p>Cargando turnos del Servidor...</p>

                ):
                turnosFiltrados.map((turno) => (
                    <Col md={4} key={turno.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{turno.Paciente.Nombre}</Card.Title>
                                <h5>{turno.Paciente.DNI}</h5>
                                <Card>

                                </Card>
                                <h5 className="mt-3">
                                    {turno.estado === "Atendido" 
                                    ? <Badge bg="success">Atendido</Badge> 
                                    : <Badge bg="warning" text="dark">En Espera</Badge>}
                                </h5>
                                <Button onClick={() => marcarComoAtendido(turno.id)} disabled={turno.estado === "Atendido"}>
                                    Llamar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DashboardRecepcion;