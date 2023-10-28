import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from 'react-hook-form'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { obtenerUsuario } from "../api/usuario_api";
import { updatePerfil, createPerfil, getPerfilUsuario } from "../api/perfil_api";


export default function Perfil_usuario() {
    // La navegacion
    const navigate = useNavigate();

    // Obtener el usuario que se está buscando desde la URL
    const paramUser = useParams();
    console.log("ParamUser: ", paramUser.id)
    // Para mostrar las opciones en el select TipoSangre
    const list_sangres = ['A', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const [selecteSangres, setSelectedSangres] = useState('');
    const handleSelectChangeSangres = (event) => {
        setSelectedSangres(event.target.value);
    };

    // Se guardan los datos consultados en la base de datos Usuario
    const [DataUsuario, setUsuarioBuscado] = useState([]);

    // Se guardan los datos consultados en la base de datos Usuario
    const [dataPerfilUsuario, setdataPerfilUsuario] = useState([]);

    async function getUsuario() {
        const usuarioBuscado = await obtenerUsuario(paramUser.id);
        // // console.log("GetUsuario")
        // // console.log(usuarioBuscado.data)
        // // console.log("GetUsuario")
        setUsuarioBuscado(usuarioBuscado.data);

        return usuarioBuscado.data
    }


    console.log("DataUsuario")  
    async function getPerfil(user) {
        try {
            const perfilUsuarioBuscado = await getPerfilUsuario(paramUser.id);
            toast.success("El perfil de usuario está completo	\n puede editarlo si lo desea");
            // console.log("No DATA");
            // console.log(perfilUsuarioBuscado.data);
            setdataPerfilUsuario(perfilUsuarioBuscado.data);
            navigate(`/ppi_15/ingresar/${paramUser.id}`);

            // Se colocan los datos del usuario en los inputs
            setValue("nombre_completo", perfilUsuarioBuscado.data.nombre_completo);
            setValue("numero_identificacion", perfilUsuarioBuscado.data.id);
            setValue("numero_contacto", perfilUsuarioBuscado.data.numero_contacto);
            setValue("correo_electronico", perfilUsuarioBuscado.data.correo_electronico);
            setValue("sexo", perfilUsuarioBuscado.data.sexo);
            setValue("nombre_contacto_emergencia", perfilUsuarioBuscado.data.nombre_contacto_emergencia);
            setValue("numero_contacto_emergencia", perfilUsuarioBuscado.data.numero_contacto_emergencia);
            setValue("direccion_residencia", perfilUsuarioBuscado.data.direccion_residencia);
            setValue("acceso_ubicacion_habilitado", perfilUsuarioBuscado.data.acceso_ubicacion_habilitado);
            setValue("alergias", perfilUsuarioBuscado.data.alergias);
            setValue("medicamentos", perfilUsuarioBuscado.data.medicamentos);
            // setValue("tipo_sangre", perfilUsuarioBuscado.data.tipo_sangre);
            setValue("medicamentos_alergicos", perfilUsuarioBuscado.data.medicamentos_alergicos);

        } catch (error) {
            if (error.response && error.response.status === 404) {
                // toast.success("Registro éxitoso");
                
                toast('No se ha completado el registro del perfil \n registrelo por favor',
                    {
                        icon: '⏳',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
                setValue("user", user.usuario);


            }
        }
    }

    useEffect(() => {
        (async () => {
            const user = await getUsuario();
            console.log("El parametro into",user)
            await getPerfil(user);
        })()

        // DataUsuario
    }, [paramUser.id]);



    /* Se toma la información del form y se guarda en la base de datos */
    const { register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();





    // Para crear el perfil
    const onSubmit = handleSubmit(async (data) => {
        try {
            const perfilUsuarioBuscado = await getPerfilUsuario(paramUser.id);
            // console.log("PAram");
            // console.log(paramUser.id)
            if (perfilUsuarioBuscado.data) {
                // // console.log(data);
                await updatePerfil(paramUser.id, data);
                toast.success("Se modificaron correctamente los datos");
                navigate(`/ppi_15/ingresar/${paramUser.id}`);

            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // console.log(data);
                await createPerfil(data);
                toast.success("Perfil actualizado con exito");
                navigate(`/ppi_15/ingresar/${paramUser.id}`);

            }
        }
    });

    return (
        <>
            <PerfilStyled>
                <div className="contenedor">
                    <div className="image">
                    </div>

                    <div className="formulario">
                        <form onSubmit={onSubmit}>
                            <h2>
                                Perfil de usuario
                            </h2>

                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                {...register('user', { required: true })}
                                required
                            />

                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                {...register('email', { required: true })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Telefono de contacto"
                                {...register('telefono', { required: true })}
                                required
                            />


                            <input
                                type="text"
                                placeholder="Nombre contacto de emergencia"
                                {...register('contacto_emergencia', { required: true })}
                                required
                            />

                            <input
                                type="number"
                                placeholder="Numero contacto de emergencia"
                                {...register('telefono_emergencia', { required: true })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Dirección de residencia"
                                {...register('direccion', { required: true })}
                                required
                            />


                            <label>
                                Acceso a la ubicación:
                            </label>
                            <input type="checkbox" {...register('acceso_ubicacion ')} />

                            <label htmlFor="alergias">
                                Alergias:
                            </label>

                            <textarea id="alergias" name="alergias" {...register('alergias', { required: true })} required></textarea>

                            <label htmlFor="medicamentos">
                                Medicamentos:
                            </label>

                            <textarea id="medicamentos" name="medicamentos" {...register('medicamentos', { required: true })} required></textarea>



                            <label htmlFor="tipo_sangre">
                                Tipo de Sangre:
                            </label>

                            {/* <input
                                type="text"
                                id="tipo_sangre"
                                name="tipo_sangre"
                                {...register('tipo_sangre', { required: true })}
                                required
                            />  */}

                            <select {...register('rh')} value={selecteSangres} onChange={handleSelectChangeSangres}>
                                <option value=''>Seleccione:</option>
                                {list_sangres.map((sangre, index) => (
                                    <option key={index} value={sangre}>
                                        {sangre}
                                    </option>
                                ))}
                            </select>

                            <button>Completar informacion</button>
                        </form>
                    </div>
                </div>
            </PerfilStyled>
        </>
    );
}

const PerfilStyled = styled.div`
    
.contenedor {
    border-radius: 15px;
    display: flex;
    width: auto;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
}

.image{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
}

img{
    width: 95%;
    height: auto;
}


.formulario{
    width: 50%;
    text-align: center;
}

form{
    display: grid;
    width: 80%;
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

h2{
    font-size: 3vw;
    margin-top: 5vh;
    color: #0B4FD9;
}
label{
    margin-bottom: 2vh;
    margin-top: 0vh;
    font-size: 1.5vw;
    color: #0B4FD9;
    font-size: 1.5vw;
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

input{
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
}
input:focus{
    outline: none;
}
input::placeholder {
    color: #0B4FD9;
}
textarea{
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
}
text:focus{
    outline: none;
}
text::placeholder {
    color: #0B4FD9;
}
select{
    text-align: center;
    font-size: 1.5vw;
    background-color: rgba(242, 242, 242, 0.7);
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
    border-radius: 8px;
    padding: 0.5em 1vw;
    margin-bottom: 2vh;
}
select:focus{
    outline:none;
}

button{
    margin-bottom: 5vh;
    font-weight: bold;
    background-color: #0B4FD9;
    color: white;
    padding: 0.5em 1vw;
    border: none;
    border-radius: 8px;
    font-size: 1.5vw;
    cursor: pointer;
    border: 1px solid #0B4FD9;
}
button:hover{
    background-color: white;
    color: #0B4FD9;
    border: 1px solid #0B4FD9;
}

`