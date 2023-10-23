import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../api/users_api";
import user_man from "../images/user_man.png";
import user_woman from "../images/user_woman.png";

const rutasLogin = [
//   { title: 'Perfil usuario', id: 1, ruta: 'perfil' },
  { title: 'Emergencia', id: 1, ruta: 'emergencia' },
//   { title: 'Triage', id: 2 , ruta: 'triage'},
//   { title: 'Calendario', id: 3 , ruta: 'calendario'},
//   { title: 'Rutas', id: 4 , ruta: 'rutas'}, // ID único
//   { title: 'Ubicación', id: 5 , ruta: 'ubicacion'}, // ID único
//   { title: 'Reseña', id: 6 , ruta: 'resena'}, // ID único
];

export default function MenuList() {
  const paramUser = useParams();

  const [genero, setGenero] = useState(''); // Establecer un estado para el género
  const [imagenPerfil, setImagenPerfil] = useState(user_man); // Establecer una imagen predeterminada

  useEffect(() => {
    async function getUsuario() {
      const usuarioBuscado = await obtenerUsuario(paramUser.id);
      const generoUsuario = usuarioBuscado.data.genero;
      setGenero(generoUsuario);

      // Cambiar la imagen según el género
      if (generoUsuario === 'Femenino') {
        setImagenPerfil(user_woman);
      }
    }
    getUsuario();
  }, [paramUser.id]);

  const listItems = rutasLogin.map(product =>
    <li key={product.id}>
      <Link to={`/ppi_15/${product.ruta}/${paramUser.id}`}>{product.title}</Link>
    </li>
  );

  return (
    <MenuStyled>
      <div className="profile-picture">
        <img src={imagenPerfil} alt="Foto de perfil" />
      </div>
      <div className="profile-slidebar">
        <div className="slidebar_inner">
          <ul key={1}>{listItems}</ul>
        </div>
      </div>
      <div className="profile-blank"></div>
    </MenuStyled>
  );
}


const MenuStyled = styled.div`


.profile-picture{
    width: auto;
    height: auto;
}

.profile-picture img {
    width: 150px;
    height: 150px;
    object-fit: cover;
}

.profile-slidebar{
    width: auto;
    height: auto;
    /* position: fixed; */ 
    /* top: 90px; */
    background-color: #F4F3EE;
}

.slidebar_inner ul{
    padding: 0px;
    list-style: none;
}

.slidebar_inner ul li{
    display: flex;
    padding: 16px 25px;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    color : #000;
}


.slidebar_inner ul li:hover{
  color: #fff;
  background-color: #DA1B2B;
  font-weight: bold;
}

.slidebar_inner ul li a{
    display: block;
    color: #000;
    width: auto;
    padding: 5px;
    text-decoration: none;
    justify-content: center;
}

.profile-slidebar .text{
    padding: 1px 1px 1px 50px;
    letter-spacing: 1px;
}

.slidebar_inner ul li a img{
    width: 30px;
}

`