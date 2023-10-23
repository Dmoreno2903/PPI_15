import styled from "styled-components"

const products = [
    { title: 'Perfil usuario', id: 1 },
    { title: 'Triage', id: 2 },
    { title: 'Calendario', id: 3 },
    { title: 'Rutas', id: 3 },
    { title: 'Ubicación', id: 3 },
    { title: 'Reseña', id: 3 },
  ];
  
function MenuList() {
    

    const listItems = products.map(product =>
        <li key={product.id}>
          {product.title}
        </li>
      );
      
      return (
        <><Menu_styled>
            
                <div class="profile-picture">
                            <img 
                                src={require('../images/user.png')} 
                                alt="Foto de perfil" 
                            />
                </div>
                <div class="profile-slidebar">
                    <div class="slidebar_inner">
                        <ul>{listItems}</ul>
                    </div>
                </div>
                <div class="profile-blank">  
                </div>

        </Menu_styled>
        </>
      );
}

export default MenuList

const Menu_styled = styled.div`

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
    background-color: #E4F2E7;
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
}

.slidebar_inner ul li a{
    display: block;
    color: #0F4365;
    width: auto;
    padding: 5px;
    text-decoration: none;
}

.slidebar_inner ul li:hover{
    background-color: #C8E4CE;
}

.profile-slidebar .text{
    padding: 1px 1px 1px 50px;
    letter-spacing: 1px;
}

.slidebar_inner ul li a img{
    width: 30px;
}

`