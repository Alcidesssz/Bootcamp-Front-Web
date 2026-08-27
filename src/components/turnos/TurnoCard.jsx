import { Col, Card, Badge, Button } from 'react-bootstrap';

const TurnoCard = ({ turno, onAtender }) => {
    return (
        <Col md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{turno.Paciente.Nombre}</Card.Title>
                                
                                <h5 className="mt-3">
                                    {turno.estado === "Atendido" 
                                    ? <Badge bg="success">Atendido</Badge> 
                                    : <Badge bg="warning" text="dark">En Espera</Badge>}
                                </h5>
                                <Button onClick={() => onAtender(turno.id)} disabled={turno.estado === "Atendido"}>
                                    Llamar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

    );
};

export default TurnoCard;