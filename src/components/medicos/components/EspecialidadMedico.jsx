const EspecialidadMedico = ({ Medico, handleChange, styles }) => (
<>
    <h4 className={styles.subtitulo}>Especialidad</h4>
            <div>
              <div>
                    <select
                        name="Especialidad"
                        value={Medico.Especialidad}
                        onChange={handleChange}
                        className={styles.campoInput}
                        required
                        >
                            <option value="">Seleccionar Especialidad</option>
                            <option value="ODONTOLOGIA">Odontologia</option>
                            <option value="NEUROLOGIA">Neurologia</option>
                            <option value="CARDIOLOGIA">Cardiologia</option>
                            <option value="PEDIATRIA">Pediatria</option>
                            <option value="DERMATOLOGIA">Dermatologia</option>
                        </select>
            </div>
            </div>
</>
    
);

export default EspecialidadMedico;