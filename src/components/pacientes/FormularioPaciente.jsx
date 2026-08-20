import {useState} from "react"
import styles from './FormularioPaciente.module.scss';
import JsonDebugger from "../utils/JsonDebugger";
import validarDatos from '../utils/validaciones.js';
import DatosPersonales from "./components/DatosPersonales.jsx";
import DireccionPaciente from "./components/DireccionPaciente.jsx";
import ObraSocialPaciente from "./components/ObraSocialPaciente.jsx";
import ContactoPaciente from "./components/ContactoPaciente.jsx";
// Reglas de validación por campo
const reglasPaciente = {
    Nombre: (valor) => valor.trim() === "" ? "El nombre es obligatorio" : null,
    DNI: (valor) => valor.length < 8 ? "El DNI es obligatorio" : null,
    // Cambiamos "email" por "correoelectronico"
    // Y validamos solo si el usuario escribió algo (valor !== "")
    CorreoElectronico: (valor) => valor !== "" && !valor.includes("@") ? "El email debe contener @" : null,
};

const FormularioPaciente = () => {
    const [Paciente, setPaciente] = useState({
        Nombre: "",
        DNI: "",
        FechaNacimiento: "",
        Sexo: "",
        Direccion: {Calle: "", Numero: "", Ciudad: "", Provincia: ""},
        Telefono: {tipo: "Celular", codArea: "", numero: ""},
        CorreoElectronico: "",
        ObraSocial: {Nombre: "", NumeroAfiliado: ""},
    });

    const [errores, setErrores] = useState({});

      const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setPaciente((prev) => {
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida antes de enviar
    const nuevosErrores = validarDatos(Paciente, reglasPaciente);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      console.log("Validación fallida"); 
      return;
    }

    console.log("JSON que voy a enviar:", Paciente);

    try {
      const response = await fetch("http://localhost:3000/api/v1/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Paciente),
      });

      const data = await response.json();

      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        alert("Paciente guardado con éxito!");
        setPaciente({
          Nombre: "",
          DNI: "",
          FechaNacimiento: "",
          Sexo: "",
          Direccion: {Calle: "", Numero: "", Ciudad: "", Provincia: ""},
          Telefono: {tipo: "Celular", codArea: "", numero: ""},
          CorreoElectronico: "",
          ObraSocial: {Nombre: "", NumeroAfiliado: ""},
        });
      }
      else {
        console.error("Error del servidor:", data);
        alert(`Error: ${data.message || "No se pudo guardar el paciente"}`);
      }
      
    } catch (error){
      console.error("Error:", error);
      alert("Error al guardar");
    }
  };

    return (
    <div className={styles.contenedorFormulario}>
      <h3>Ingreso de Nuevo Paciente</h3>
      <form onSubmit={handleSubmit}>

        <DatosPersonales
            Paciente={Paciente}
            errores={errores}
          handleChange={handleChange}
            styles={styles}
        />

        <ContactoPaciente
            Paciente={Paciente}
            errores={errores}
          handleChange={handleChange}
            styles={styles}
        />
        
        <DireccionPaciente
            Paciente={Paciente}
          handleChange={handleChange}
            styles={styles}
        />

        <ObraSocialPaciente
            Paciente={Paciente}
          handleChange={handleChange}
            styles={styles}
        />  
                
                <button type="submit" className={styles.btnGuardar}>
          Guardar Paciente
        </button>
           
           </form>
            <JsonDebugger
                data={Paciente}
                titulo="ESTADO DEL JSON"
            />
        </div>
        
    );
};

export default FormularioPaciente