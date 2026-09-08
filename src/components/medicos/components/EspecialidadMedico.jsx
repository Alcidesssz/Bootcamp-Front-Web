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
                            <option value="6a9f56c2e376fbf2759c8561">Odontologia</option>
                            <option value="6a9f5695e376fbf2759c8560">Neurologia</option>
                            <option value="6a9f5710e376fbf2759c8562">Cardiologia</option>
                            <option value="6a9f573ae376fbf2759c8563">Pediatria</option>
                            <option value="6a9f562be376fbf2759c855e">Dermatologia</option>
                        </select>
            </div>
            </div>
</>
    
);

export default EspecialidadMedico;