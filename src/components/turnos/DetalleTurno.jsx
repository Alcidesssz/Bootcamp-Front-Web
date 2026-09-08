import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Card, Col, Container, ListGroup, Row, Spinner, Stack } from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';

const DetalleTurno = () => {
    const { id } = useParams();
    const { data, isLoading } = useFetch(`/turnos/?id=${id}`);
    const turno = Array.isArray(data) ? data[0] : data;

    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" role="status" />
                <p className="text-body-secondary mt-3">Cargando detalle del turno...</p>
            </Container>
        );
    }

    if (!turno) {
        return (
            <Container className="py-5">
                <Alert variant="warning">
                    No se encontró el turno solicitado.
                </Alert>
                <Button as={Link} to="/" variant="outline-primary">Volver al dashboard</Button>
            </Container>
        );
    }

    const paciente = turno.Paciente;
    const fecha = new Date(turno.FechaTurno);
    const historial = paciente?.HistoriaClinica;

    return (
        <Container className="pb-5">
            <Stack direction="horizontal" className="justify-content-between align-items-start mb-4">
                <div>
                    <p className="text-body-secondary mb-1">Detalle del turno</p>
                    <h1 className="h2 mb-0">{paciente?.Nombre ?? "Paciente sin asignar"}</h1>
                </div>
                <Badge bg={turno.Estado === "Atendido" ? "success" : "warning"} text={turno.Estado === "Atendido" ? undefined : "dark"} className="fs-6">
                    {turno.Estado === "Atendido" ? "Atendido" : "En espera"}
                </Badge>
            </Stack>

            <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                    <Row className="g-4">
                        <Col xs={12} md={4}>
                            <div className="small text-body-secondary">Fecha y hora</div>
                            <div className="fw-semibold">{fecha.toLocaleDateString("es-AR")}</div>
                            <div>{fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} hs</div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="small text-body-secondary">Especialidad</div>
                            <div className="fw-semibold text-capitalize">{turno.Especialidad}</div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="small text-body-secondary">Identificador</div>
                            <div className="fw-semibold text-break">{turno.id}</div>
                        </Col>
                    </Row>
                    {turno.observaciones && <Card.Text className="border-top pt-3 mt-4 mb-0"><strong>Observaciones:</strong> {turno.observaciones}</Card.Text>}
                </Card.Body>
            </Card>

            {!paciente ? (
                <Alert variant="info">Este turno todavía no tiene un paciente asignado.</Alert>
            ) : (
                <Row className="g-4">
                    <Col xs={12} lg={6}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Header className="bg-white fw-semibold">Datos del paciente</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item><span className="text-body-secondary">DNI</span><br />{paciente.DNI}</ListGroup.Item>
                                <ListGroup.Item><span className="text-body-secondary">Correo Electronico</span><br />{paciente.CorreoElectronico}</ListGroup.Item>
                                <ListGroup.Item><span className="text-body-secondary">Telefono</span><br />{paciente.Telefono ? ` ${paciente.Telefono.tipo}, (${paciente.Telefono.codArea}) ${paciente.Telefono.numero}` : "No registrado"}</ListGroup.Item>
                                <ListGroup.Item><span className="text-body-secondary">Direccion</span><br />{paciente.Direccion ? `${paciente.Direccion.Calle} ${paciente.Direccion.Numero}, ${paciente.Direccion.Ciudad}, ${paciente.Direccion.Provincia}` : "No registrada"}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Header className="bg-white fw-semibold">Informacion medica</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item><span className="text-body-secondary">Obra social</span><br />{paciente.ObraSocial ? `${paciente.ObraSocial.Nombre} · Afiliado ${paciente.ObraSocial.NumeroAfiliado}` : "No registrada"}</ListGroup.Item>
                                <ListGroup.Item><span className="text-body-secondary">Ultimo diagnostico</span><br />{historial?.Diagnostico ?? "Sin datos"}</ListGroup.Item>
                                <ListGroup.Item><span className="text-body-secondary">Tratamiento</span><br />{historial?.Tratamiento ?? "Sin datos"}</ListGroup.Item>
                                <ListGroup.Item><span className="text-body-secondary">Medico</span><br />{historial?.Medico ?? "Sin datos"}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}

            <Button as={Link} to="/" variant="outline-secondary" className="mt-4">Volver al dashboard</Button>
        </Container>
    );
};

export default DetalleTurno;