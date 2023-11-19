import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerUsuario } from "../api/usuario_api";
import user_man from "../images/user_man.png";
import user_woman from "../images/user_woman.png";

const rutasLogin = [
  { title: 'Emergencia', id: 1, ruta: 'emergencia' },
  { title: 'Registrar cita', id: 2 , ruta: 'Regcitamedica'},
  { title: 'Calendario', id: 3 , ruta: 'calendario'},
];

export default function MenuList() {
  const paramUser = useParams();

  const [genero, setGenero] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState(user_man);

  useEffect(() => {
    async function getUsuario() {
      const usuarioBuscado = await obtenerUsuario(paramUser.id);
      const generoUsuario = usuarioBuscado.data.genero;
      setGenero(generoUsuario);

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
  .profile-picture {
    width: auto;
    height: auto;
  }

  .profile-picture img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  .profile-slidebar {
    width: auto;
    height: auto;
    background-color: #f4f3ee;
    margin-top: 20px;
  }

  .slidebar_inner ul {
    padding: 10px;
    list-style: none;
    margin: 0;
  }

  .slidebar_inner ul li {
    display: flex;
    padding: 16px 25px;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    color: #000;
    border: 1px solid #081a40;
    margin-bottom: 10px; /* Espacio entre elementos li */
  }

  .slidebar_inner ul li:hover {
    color: #fff;
    background-color: #0b4fd9;
    font-weight: bold;
  }

  .slidebar_inner ul li a {
    display: block;
    color: #000;
    width: auto;
    padding: 5px;
    text-decoration: none;
    justify-content: center;
  }

  .profile-slidebar .text {
    padding: 1px 1px 1px 50px;
    letter-spacing: 1px;
  }

  .slidebar_inner ul li a img {
    width: 30px;
    margin-right: 10px;
  }
`;