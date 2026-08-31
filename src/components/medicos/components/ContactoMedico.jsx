const ContactoMedico = ({ Medico, errores, handleChange, styles }) => (
<>
    <h4 className={styles.subtitulo}>Contacto</h4>
            <div className={styles.formGroup}>
                <div>
                    <label>Tipo*</label>
                    <select
                        className={styles.campoInput}
                        name="Telefono.tipo"
                        value={Medico.Telefono.tipo}
                        onChange={handleChange}
                        >
                            <option value="CELULAR">Celular</option>
                            <option value="FIJO">Fijo</option>
                    </select>    
                </div>
                <div>
                    <label>Codigo Area*</label>
                    <input
                        type="number"
                        name="Telefono.codArea"
                        value={Medico.Telefono.codArea}
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
                        value={Medico.Telefono.numero}
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
                        value={Medico.CorreoElectronico}
                        className={styles.campoInput}
                        placeholder="Correo Electronico"
                        onChange={handleChange}
                        />
                        {errores.CorreoElectronico && <span className={styles.error}>{errores.CorreoElectronico}</span>}
                        </div>
</>
);

export default ContactoMedico