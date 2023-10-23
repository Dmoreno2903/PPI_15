import { Link } from "react-router-dom";
import styled from "styled-components";
import Ingreso from "./Ingreso";

function Header() {
    return (
      <><Header_styled>
        <h2>Medi<span>Minder</span></h2>
        <div className="link_buttons">
            <Ingreso/>
        </div>
        </Header_styled></>
    )
  }
  
export default Header
  
const Header_styled = styled.nav`

    background-color: #081A40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;
  
    .link_buttons{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h2{
        font-size: 1.5vw;
        color: white;
        font-weight: 500;
        span{
        font-weight: bold;
        }
    }

    a{
        font-size: 1.1vw;
        color: white;
        text-decoration: none;
        margin-right: 1.5rem;
    }
    a:hover{
        font-size: 1.2vw;
    }
`