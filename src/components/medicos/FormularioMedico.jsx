import {useState} from "react"
import styles from "./FormularioMedico.module.scss"
import validarDatos from "../utils/validaciones";
import DatosPersonalesMedico from "./components/DatosPersonalesMedico";
import EspecialidadMedico from "./components/EspecialidadMedico";
import ContactoMedico from "./components/ContactoMedico";
import JsonDebugger from "../utils/JsonDebugger";

const reglasMedico = {
    Nombre: (valor) => valor.trim() === "" ? "El nombre es obligatorio" : null,
    Matricula: (valor) => !valor.trim() ? "Obligatoria" : !/^\d{4,6}$/.test(valor.trim()) ? "Debe ser un número de 4 a 6 dígitos" : null,
    CorreoElectronico: (valor) => valor !== "" && !valor.includes("@") ? "El email debe contener @" : null,
};

const FormularioMedico = () => {
    const [Medico, setMedico] = useState({
    Nombre: "",
    Matricula: "",
    Especialidad: "",
    Telefono: { tipo: "CELULAR", codArea: "", numero: ""},
    CorreoElectronico: "",
    })

    const [errores, setErrores] = useState({});

      const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setMedico((prev) => {
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
    const nuevosErrores = validarDatos(Medico, reglasMedico);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      console.log("Validación fallida");
      return;
    }

    console.log("JSON que voy a enviar:", Medico);

    try {
      const response = await fetch("http://localhost:3000/api/v1/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Medico),
      });

      const data = await response.json();

      console.log("Respuesta del servidor:", data);

    if (response.ok) {
    alert("Medico guardado con éxito!");
    setMedico({
        Nombre: "",
        Matricula: "",
        Especialidad: "",
        Telefono: { tipo: "CELULAR", codArea: "", numero: ""},
        CorreoElectronico: "",
        });
      }
      else {
        console.error("Error del servidor:", data);
        alert(`Error: ${data.message || "No se pudo guardar el medico"}`);
      }
      
    } catch (error){
      console.error("Error:", error);
      alert("Error al guardar");
    }
  };

  return (
    <div className={styles.contenedorFormulario}>
    <h3>Ingreso de Nuevo Medico</h3>
    <form onSubmit={handleSubmit}>
   
        <DatosPersonalesMedico
            Medico={Medico}
            errores={errores}
            handleChange={handleChange}
            styles={styles}
        />

        <EspecialidadMedico
            Medico={Medico}
            handleChange={handleChange}
            styles={styles}
        />

        <ContactoMedico
            Medico={Medico}
            errores={errores}
            handleChange={handleChange}
            styles={styles}
        />

        <button type="submit" className={styles.btnGuardar}>
              Guardar Paciente
            </button>

    </form>

        <JsonDebugger
            data={Medico}
            titulo="ESTADO DEL JSON"
            />

    </div>
  );
};

export default FormularioMedico;