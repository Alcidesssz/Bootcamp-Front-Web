import { useState } from 'react'
import { Container, Badge, Row, Col, Card, Button } from 'react-bootstrap';

const turnosDelDia = [
  { id: 1, pacientes: "Juan Perez", especialidad: "Cardiología", estado: "Pendiente" },
  { id: 2, pacientes: "María García", especialidad: "Neurología", estado: "Pendiente" },
  { id: 3, pacientes: "Carlos López", especialidad: "Ortopedia", estado: "Pendiente" },
  { id: 4, pacientes: "Ana Torres", especialidad: "Dermatología", estado: "Pendiente" },
  { id: 5, pacientes: "Luis Fernández", especialidad: "Pediatría", estado: "Pendiente" },
  { id: 6, pacientes: "Sofía Martínez", especialidad: "Ginecología", estado: "Pendiente" },
  { id: 7, pacientes: "Diego Ramírez", especialidad: "Oftalmología", estado: "Pendiente" },
  { id: 8, pacientes: "Valentina Gómez", especialidad: "Psiquiatría", estado: "Pendiente" },
  { id: 9, pacientes: "Javier Torres", especialidad: "Endocrinología", estado: "Pendiente" },
  { id: 10, pacientes: "Camila Rojas", especialidad: "Gastroenterología", estado: "Pendiente" },
  { id: 11, pacientes: "Martín Herrera", especialidad: "Urología", estado: "Pendiente" },
  { id: 12, pacientes: "Isabella Castro", especialidad: "Reumatología", estado: "Pendiente" },
  { id: 13, pacientes: "Sebastián Morales", especialidad: "Otorrinolaringología", estado: "Pendiente" },
  { id: 14, pacientes: "Lucía Vargas", especialidad: "Nefrología", estado: "Pendiente" },
  { id: 15, pacientes: "Mateo Rivas", especialidad: "Hematología", estado: "Pendiente" },
];

const DashboardRecepcion = () => {
    const [busqueda, setBusqueda] = useState("");
    const [turnos, setTurnos] = useState(turnosDelDia);

const turnosFiltrados = turnos.filter(turno =>
    turno.pacientes.toLowerCase().includes(busqueda.toLowerCase())
);

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
                {turnosFiltrados.map((turno) => (
                    <Col md={4} key={turno.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{turno.pacientes}</Card.Title>
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