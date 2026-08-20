const DatosPersonales = ({ Paciente, errores, handleChange, styles }) => (
<>
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
            </div>
</>
    
);

export default DatosPersonales