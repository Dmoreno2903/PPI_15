import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from 'react-hook-form'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { actualizarUsuario, obtenerUsuario } from "../api/usuario_api";
import { updatePerfil, createPerfil, getPerfilUsuario, getAllPerfil } from "../api/perfil_api";
import perfil_img from "../images/img_Profile.jpg"

/**
 * Componente funcional que representa la vista del perfil de usuario.
 *
 * @component
 * @returns {JSX.Element} Retorna un elemento JSX que contiene la información y formulario del perfil de usuario.
 */
export default function Perfil_usuario() {
    // La navegacion
    const navigate = useNavigate();

    // Obtener el usuario que se está buscando desde la URL
    const paramUser = useParams();

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

    /**
   * Función asincrónica que obtiene información del usuario y actualiza el estado del componente.
   *
   * @async
   * @function
   */
    async function getUsuario() {
        const usuarioBuscado = await obtenerUsuario(paramUser.id);
        setUsuarioBuscado(usuarioBuscado.data);
        return usuarioBuscado.data;
    }


    /**
   * Función asincrónica que obtiene y verifica la existencia del perfil del usuario.
   * Muestra un mensaje y redirige según la existencia del perfil.
   *
   * @async
   * @function
   * @param {Object} user - Objeto que representa al usuario.
   */
    async function getPerfil(user) {
        const perfilUsuarioBuscado = await getAllPerfil();
        var existe = false;
        var perfil_usuario = {};

        for (const perfil of perfilUsuarioBuscado.data) {
            if (perfil.user === user.usuario) {
                existe = true;
                perfil_usuario = perfil;
            }
        }

        if (existe) {
            toast.success("El perfil de usuario está completo\npuede editarlo si lo desea");
            setdataPerfilUsuario(perfil_usuario);
            navigate(`/ppi_15/ingresar/${paramUser.id}`);

            // Se colocan los datos del usuario en los inputs
            setValue("email", perfil_usuario.email);
            setValue("telefono", perfil_usuario.telefono);
            setValue("contacto_emergencia", perfil_usuario.contacto_emergencia);
            setValue("telefono_emergencia", perfil_usuario.telefono_emergencia);
            setValue("direccion", perfil_usuario.direccion);
            setValue("acceso_ubicacion", perfil_usuario.acceso_ubicacion);
            setValue("latitud", perfil_usuario.acceso_ubicacion);
            setValue("longitud", perfil_usuario.acceso_ubicacion);
            setValue("alergias", perfil_usuario.alergias);
            setValue("medicamentos", perfil_usuario.medicamentos);
            setValue("rh", perfil_usuario.rh);
        } else {
            toast('No se ha completado el registro del perfil \n registrelo por favor', {
                icon: '⏳',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            setValue("user", user.usuario);
        }
    }

    useEffect(() => {
        (async () => {
            const user = await getUsuario();
            await getPerfil(user);
        })()
    }, [paramUser.id]);

    /* Se toma la información del form y se guarda en la base de datos */
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    // Para crear el perfil
    const onSubmit = handleSubmit(async (data) => {
        const perfilUsuarioBuscado = await getAllPerfil();
        var existe = false;
        var perfil_usuario = {};
        var posicion = 0;
        var id_perfil = 100;

        for (const perfil of perfilUsuarioBuscado.data) {
            posicion += 1;
            if (perfil.user === paramUser.id) {
                existe = true;
                perfil_usuario = perfil;
                id_perfil = posicion;
            }
        }

        var dataa = {};
        if (existe) {
            console.log("Perfil a actualizar", id_perfil);

            // Propiedades del objeto dataa
            var properties = [
                "user",
                "email",
                "telefono",
                "contacto_emergencia",
                "telefono_emergencia",
                "direccion",
                "acceso_ubicacion",
                "latitud",
                "longitud",
                "alergias",
                "medicamentos",
                "rh"
            ];

            // Asignar valores al objeto dataa
            properties.forEach(function (property) {
                dataa[property] = data[property];
            });

            // Asignar valores específicos
            dataa["user"] = paramUser.id;
            dataa["latitud"] = 6.477726194410493;
            dataa["longitud"] = -75.54883793840892;
            await updatePerfil(id_perfil, dataa);
            toast.success("Perfil actualizado con exito");
        } else {
            console.log("Creacion antes del error", paramUser.id);
            data["user"] = paramUser.id;
            data["latitud"] = 6.477726194410493;
            data["longitud"] = -75.54883793840892;

            await createPerfil(data);
            toast.success("Perfil creado con exito");
            navigate(`/ppi_15/ingresar/${paramUser.id}`);
        }
    });

    const [newPassword, setNewPassword] = useState('')

    const changeInput = ({ target }) => {
        setNewPassword(target.value)
    }

    async function changePassword() {
        const changeUser = await obtenerUsuario(paramUser.id)
        const objectUser = changeUser.data
        objectUser.password = newPassword
        console.log(objectUser)
        setNewPassword('')
        actualizarUsuario(paramUser.id, objectUser)
        toast.success('Contraseña cambiada con éxito')
    }

    return (
        <>
            <PerfilStyled>
                <div className="contenedor">
                    <div className="image">
                        <img src={perfil_img} className="info_image" />
                    </div>

                    <div className="formulario">
                        <form onSubmit={onSubmit}>
                            <h2>Perfil de usuario</h2>

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
                            <input type="checkbox" {...register('acceso_ubicacion')} />

                            <label htmlFor="alergias">
                                Alergias:
                            </label>
                            <textarea id="alergias" name="alergias" {...register('alergias', { required: true })} required></textarea>

                            <label htmlFor="medicamentos">
                                Medicamentos:
                            </label>
                            <textarea id="medicamentos" name="medicamentos" {...register('medicamentos', { required: true })} required></textarea>

                            <select
                                {...register('rh')}
                                value={selecteSangres}
                                onChange={handleSelectChangeSangres}
                                required
                            >
                                <option value=''>Seleccione Rh +:</option>
                                {list_sangres.map((sangre, index) => (
                                    <option key={index} value={sangre}>
                                        {sangre}
                                    </option>
                                ))}
                            </select>

                            <button>Completar informacion</button>

                        </form>

                        {/* <label> Cambiar la contraseña</label>
                        <input type="text" placeholder="Nueva contraseña" value={newPassword} onChange={changeInput}></input>
                        <button onClick={changePassword}>CAMBIAR</button> */}

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