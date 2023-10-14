import styled from "styled-components";
import img_registro from "../images/img_registro.jpg"
import Menu from "../components/Menu";
import Perfil_usuario from "../components/Prefil-usuario";

export default function Ingresar(){
    return(
        <>
        <Ingresar_styled>
            <div className="profile-container">
                <div class="profile-picture-links">
                    <Menu />
                </div>
                <div class="perfil">
                    <Perfil_usuario />
                </div>
            </div>
        </Ingresar_styled>
        </>
    );
}



const Ingresar_styled = styled.div`
.profile-container {
    background-color: #fff;
    height: 720px;
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
}

.profile-picture-links{
    background-color: #003840;
    width: 350px;
    display: flex;
    flex-direction: column;
}

.perfil {
    /* padding: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; */
    margin: 5px 5px 5px 5px;
    width: 100%;
    font-family: 'Roboto Slab', serif;
    font-size: 10px;
    overflow: auto;
    display: block;
}


.perfil h1 {
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
}
`