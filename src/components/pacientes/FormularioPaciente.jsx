import {useState} from "react"
import styles from './FormularioPaciente.module.scss';
import JsonDebugger from "../utils/JsonDebugger";

const FormularioPaciente = () => {
    const [paciente, setPaciente] = useState({
        nombre: "",
        dni: "",
        fechaNacimiento: "",
        sexo: "",
        direccion: {calle: "", numero: "", ciudad: "", provincia: ""},
        telefono: {codPais: "", codArea: "", numero: ""},
        correoElectronico: "",
        obraSocial: {nombre: "", numeroAfiliado: ""},

    });

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
    try {
      const response = await fetch("http://localhost:3001/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente),
      });

      if (response.ok) {
        alert("Paciente guardado con éxito!");
        setPaciente({
        nombre: "",
        dni: "",
        fechaNacimiento: "",
        sexo: "",
        direccion: {calle: "", numero: "", ciudad: "", provincia: ""},
        telefono: {codPais: "", codArea: "", numero: ""},
        correoElectronico: "",
        obraSocial: {nombre: "", numeroAfiliado: ""},
        });
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
                    name="nombre"
                    value={paciente.nombre}
                    onChange={handleChange}
                    className={styles.campoInput}
                    />
                    </div>
            <div>
                <label>DNI*</label>
                <input 
                    type="number"
                    name="dni"
                    value={paciente.dni}
                    className={styles.campoInput}
                    placeholder="DNI"
                    onChange={handleChange}
                    />
                </div>
            <div>
                <label>Fecha de Nacimiento*</label>
                <input 
                    type="date"
                    name="fechaNacimiento"
                    value={paciente.fechaNacimiento}
                    className={styles.campoInput}
                    placeholder="Fecha Nacimiento"
                    onChange={handleChange}
                    />
                </div>
                <div>
                <label>Sexo*</label>
                <select
                    className={styles.campoInput}
                    name="sexo"
                    value={paciente.sexo}
                    onChange={handleChange}
                    >
                        <option value="">Seleccionar Sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                </select>
        </div>
        <h4 className={styles.subtitulo}>Contacto</h4>
        <div className={styles.formGroup}>
            <div>
                <label>Codigo Pais*</label>
                <input
                    type="number"
                    name="telefono.codPais"
                    value={paciente.telefono.codPais}
                    className={styles.campoInput}
                    placeholder="+54"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Codigo Area*</label>
                <input
                    type="number"
                    name="telefono.codArea"
                    value={paciente.telefono.codArea}
                    className={styles.campoInput}
                    placeholder="3777"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Numero*</label>
                <input
                    type="number"
                    name="telefono.numero"
                    value={paciente.telefono.numero}
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
                    name="correoElectronico"
                    value={paciente.correoElectronico}
                    className={styles.campoInput}
                    placeholder="Correo Electronico"
                    onChange={handleChange}
                    />
                    </div>
        <h4 className={styles.subtitulo}>Direccion</h4>
        <div className={styles.formGroup}>
            <div>
                <label>Calle*</label>
                <input
                    type="text"
                    name="direccion.calle"
                    value={paciente.direccion.calle}
                    className={styles.campoInput}
                    placeholder="Angel Soto"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Numero*</label>
                <input
                    type="number"
                    name="direccion.numero"
                    value={paciente.direccion.numero}
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
                    name="direccion.ciudad"
                    value={paciente.direccion.ciudad}
                    className={styles.campoInput}
                    placeholder="Goya"
                    onChange={handleChange}
                />    
            </div>
            <div>
                <label>Provincia*</label>
                <input
                    type="text"
                    name="direccion.provincia"
                    value={paciente.direccion.provincia}
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
                    name="obraSocial.nombre"
                    value={paciente.obraSocial.nombre}
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
                    name="obraSocial.numeroAfiliado"
                    value={paciente.obraSocial.numeroAfiliado}
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
                data={paciente}
                titulo="ESTADO DEL JSON"
            />
        </div>
    );
};

export default FormularioPaciente