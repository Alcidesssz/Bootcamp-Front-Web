const DatosPersonalesMedico = ({ Medico, errores, handleChange, styles }) => (
<>
    <h4 className={styles.subtitulo}>Datos Personales</h4>
            <div>
              <div>
                <label>Nombre Completo*</label>
                    <input 
                        type="text"
                        name="Nombre"
                        value={Medico.Nombre}
                        onChange={handleChange}
                        className={styles.campoInput}
                        required
                        />
                        {errores.Nombre && <span className={styles.error}>{errores.Nombre}</span>}
                        </div>
                <div>
                    <label>Matricula*</label>
                    <input 
                        type="number"
                        name="Matricula"
                        value={Medico.Matricula}
                        className={styles.campoInput}
                        placeholder="Ej. 142536"
                        onChange={handleChange}
                        required
                        />
                        {errores.Matricula && <span className={styles.error}>{errores.Matricula}</span>}
                    </div>
            </div>
</>
    
);

export default DatosPersonalesMedico