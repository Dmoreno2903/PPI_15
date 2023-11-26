import styled from "styled-components";
// import Menu from "../components/Menu";
import MenuList from "../components/Menu";
import CambioContra from "./CambioContra";

export default function Cambio(){
    return(
        <>
        <CambioStyled>
            <div className="profile-container">
                <div className="profile-picture-links">
                    {/* <Menu /> */}
                    <MenuList />
                </div>
                <div className="perfil">
                    < CambioContra />
                </div>
            </div>
            
        </CambioStyled>
        </>
    );
}



const CambioStyled = styled.div`
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;

.profile-container {
    background-color: #fff;
    height: 720px;
    width: 90%;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
}

.profile-picture-links{
    background-color: #081A40;
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