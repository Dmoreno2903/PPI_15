import styled from "styled-components";
// import img_registro from "../images/img_registro.jpg"

export default function Perfil_usuario(){
    return(
        <>
        <Perfil_styled>
        
                        <h1>Perfil de Usuario</h1>
                        <div class="info">
                            <div>
                                <p><strong>Nombre completo:</strong> Juan Pérez</p>
                                <p><strong>Número de identificación:</strong> 123456789</p>
                                <p><strong>Número de contacto:</strong> 555-555-5555</p>
                                <p><strong>Correo electrónico:</strong> juan@example.com</p>
                                <p><strong>EPS:</strong> EPS SaludTotal</p>
                            </div>
                            <div>
                                <p><strong>Sexo:</strong> Masculino</p>
                                <p><strong>Contacto de emergencia:</strong> María Pérez (555-123-4567)</p>
                                <p><strong>Dirección de residencia:</strong> Calle 123, Ciudad, País</p>
                                <p><strong>Acceso a la ubicación:</strong> Habilitado</p>
                            </div>
                        </div>
                        <div class="info_especializada">
                            <div class="info_row">
                                <div class="info_label"><strong>Alergias:</strong></div>
                                <div class="info_value">
                                    <ul>
                                        <li>Polen</li>
                                        <li>Maní</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="info_row">
                                <div class="info_label"><strong>Medicamentos:</strong></div>
                                <div class="info_value">
                                    <ul>
                                        <li>Aspirina - 100mg (Tomar una vez al día)</li>
                                        <li>Lisinopril - 10mg (Tomar cada mañana)</li>
                                        <li>Insulina - 20 unidades (Inyectar antes de las comidas)</li>
                                        <li>Atorvastatina - 40mg (Tomar antes de dormir)</li>
                                        <li>Ventolin - 2 inhalaciones (Cuando sea necesario)</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="info_row">
                                <div class="info_label"><strong>Tipo de sangre:</strong></div>
                                <div class="info_value">A+</div>
                            </div>
                            <div class="info_row">
                                <div class="info_label"><strong>Medicamentos a los que es alérgico:</strong></div>
                                <div class="info_value">Penicilina</div>
                            </div>
                        </div>
                        
                    
        </Perfil_styled>
        </>
    );
}

const Perfil_styled = styled.div`

.info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 18px;
}

.info div {
    height: 200px;
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    background-color: #E4F2E7;
}

/* Estilos para la tabla con divs */
.info_especializada {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin: 20px;
    background-color: #E4F2E7;
    font-size: 18px;
}

.info_row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.info_label {
    width: 40%;
    font-weight: bold;
}

.info_value {
    width: 60%;
}

ul {
    list-style: none;
    padding-left: 0;
}

ul li {
    margin-bottom: 5px;
}

.vertical-form {
    padding-top: 30px;
    max-width: 400px;
    margin: 0 auto;
}

.vertical-form label {
    display: block;
    margin-bottom: 8px;
}

.vertical-form input[type="text"],
.vertical-form input[type="tel"],
.vertical-form input[type="email"],
.vertical-form select {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.vertical-form input[type="radio"] {
    margin-right: 8px;
}

.vertical-form input[type="submit"] {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.vertical-form input[type="submit"]:hover {
    background-color: #0056b3;
}
`