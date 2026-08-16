import {useState} from "react"
import styles from './FormularioPaciente.module.scss';
import JsonDebugger from "../utils/JsonDebugger";
import validarDatos from '../utils/validaciones.js';
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
        <h4 className={styles.subtitulo}>Datos Personales</h4>
        <div>
          <div>
            <label>Nombre Completo*</label>
                <input 
                    type="text"
                    name="Nombre"
                    value={Paciente.Nombre}
                    onChange={handleChange}
                    className={styles.campoInput}
                    required
                    />
                    {errores.Nombre && <span className={styles.error}>{errores.Nombre}</span>}
                    </div>
            <div>
                <label>DNI*</label>
                <input 
                    type="number"
                    name="DNI"
                    value={Paciente.DNI}
                    className={styles.campoInput}
                    placeholder="DNI"
                    onChange={handleChange}
                    required
                    />
                    {errores.DNI && <span className={styles.error}>{errores.DNI}</span>}
                </div>
            <div>
                <label>Fecha de Nacimiento*</label>
                <input 
                    type="date"
                    name="FechaNacimiento"
                    value={Paciente.FechaNacimiento}
                    className={styles.campoInput}
                    placeholder="Fecha Nacimiento"
                    onChange={handleChange}
                    />
                </div>
                <div>
                <label>Sexo*</label>
                <select
                    className={styles.campoInput}
                    name="Sexo"
                    value={Paciente.Sexo}
                    onChange={handleChange}
                    >
                        <option value="">Seleccionar Sexo</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                </select>
        </div>
        <h4 className={styles.subtitulo}>Contacto</h4>
        <div className={styles.formGroup}>
            <div>
                <label>Tipo*</label>
                <select
                    className={styles.campoInput}
                    name="Telefono.tipo"
                    value={Paciente.Telefono.tipo}
                    onChange={handleChange}
                    >
                        <option value="Celular">Celular</option>
                        <option value="Fijo">Fijo</option>
                </select>    
            </div>
            <div>
                <label>Codigo Area*</label>
                <input
                    type="number"
                    name="Telefono.codArea"
                    value={Paciente.Telefono.codArea}
                    className={styles.campoInput}
                    placeholder="3777"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Numero*</label>
                <input
                    type="number"
                    name="Telefono.numero"
                    value={Paciente.Telefono.numero}
                    className={styles.campoInput}
                    placeholder="334455"
                    onChange={handleChange}
                />    
            </div>
        </div>
            <div>
                <label>Correo Electronico*</label>    
                <input 
                    type="text"
                    name="CorreoElectronico"
                    value={Paciente.CorreoElectronico}
                    className={styles.campoInput}
                    placeholder="Correo Electronico"
                    onChange={handleChange}
                    />
                    {errores.CorreoElectronico && <span className={styles.error}>{errores.CorreoElectronico}</span>}
                    </div>
        <h4 className={styles.subtitulo}>Direccion</h4>
        <div className={styles.formGroup}>
            <div>
                <label>Calle*</label>
                <input
                    type="text"
                    name="Direccion.Calle"
                    value={Paciente.Direccion.Calle}
                    className={styles.campoInput}
                    placeholder="Angel Soto"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Numero*</label>
                <input
                    type="number"
                    name="Direccion.Numero"
                    value={Paciente.Direccion.Numero}
                    className={styles.campoInput}
                    placeholder="1234"
                    onChange={handleChange}
                />    
            </div>
            </div>
            <div className={styles.formGroup}>
            <div>
                <label>Ciudad*</label>
                <input
                    type="text"
                    name="Direccion.Ciudad"
                    value={Paciente.Direccion.Ciudad}
                    className={styles.campoInput}
                    placeholder="Goya"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Provincia*</label>
                <input
                    type="text"
                    name="Direccion.Provincia"
                    value={Paciente.Direccion.Provincia}
                    className={styles.campoInput}
                    placeholder="Corrientes"
                    onChange={handleChange}
                />    
            </div>
        </div>
        <h4 className={styles.subtitulo}>Obra Social</h4>
        <div className={styles.formGroup}>
            <div>
                <label>Obra Social*</label>
                <select
                    className={styles.campoInput}
                    name="ObraSocial.Nombre"
                    value={Paciente.ObraSocial.Nombre}
                    onChange={handleChange}
                    >
                        <option value="">Seleccionar Obra Social</option>
                        <option value="OSDE">OSDE</option>
                        <option value="SWISS MEDICAL">SWISS MEDICAL</option>
                        <option value="GALENO">GALENO</option>
                        <option value="MEDIFE">MEDIFE</option>
                        <option value="OSFA">OSFA</option>
                        <option value="OTRO">OTRO</option>
                        <option value="NINGUNA">NINGUNA</option>
                </select>
                </div> 
                <div>
                <label>Numero Afiliado*</label>
                <input
                    type="text"
                    name="ObraSocial.NumeroAfiliado"
                    value={Paciente.ObraSocial.NumeroAfiliado}
                    className={styles.campoInput}
                    onChange={handleChange}
                />    
                </div>
            </div>   
            </div>
                
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