import {Button, Card} from 'react-bootstrap'

const PacienteCard = ({nombre, obraSocial = "No especificada", dni, variant="light"}) => {

    return (
        <Card>
            <h2>Nombre: {nombre}</h2>
            <p>Obra Social: {obraSocial}</p>
            <p>DNI: {dni}</p>
            <Button variant={variant}>Ver Historial Clinico</Button>
        </Card>
    )
}

export default PacienteCard