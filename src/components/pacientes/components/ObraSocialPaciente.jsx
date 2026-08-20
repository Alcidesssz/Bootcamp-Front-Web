const ObraSocialPaciente = ({ Paciente, handleChange, styles }) => (
<>
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
</>
);

export default ObraSocialPaciente