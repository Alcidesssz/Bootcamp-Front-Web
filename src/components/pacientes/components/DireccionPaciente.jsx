const DireccionPaciente = ({ Paciente, handleChange, styles }) => (
<>
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
</>
);

export default DireccionPaciente