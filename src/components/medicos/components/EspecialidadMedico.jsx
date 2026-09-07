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
                            <option value="6a9f3dc060a98d9c23354ea3">Odontologia</option>
                            <option value="6a9f3d8560a98d9c23354ea2">Neurologia</option>
                            <option value="6a9f3e2960a98d9c23354ea4">Cardiologia</option>
                            <option value="6a9f39b860a98d9c23354e9b">Pediatria</option>
                            <option value="6a9f3e5d60a98d9c23354ea5">Dermatologia</option>
                        </select>
            </div>
            </div>
</>
    
);

export default EspecialidadMedico;