import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import Home from './layouts/Home';
import Información from './layouts/Información';
import Conocenos from './layouts/Conocenos';
import Registro from './layouts/Registro';
import Ingresar from './layouts/Ingresar';
import Perfil_usuario from './components/Prefil-usuario';
import Emergencia from './layouts/Emergencia';

const router = createBrowserRouter([
  {
    path: "/ppi_15",
    element: <Home/>,
    children: [
      {
        path: "/ppi_15/informacion",
        element: <Información/>
      },
      {
        path: "/ppi_15/conocenos",
        element: <Conocenos/>
      },
      {
        path: "/ppi_15/registro",
        element: <Registro/>
      },
      {
        path: "/ppi_15/ingresar",
        element: <Ingresar />
      },
      {
        path: "/ppi_15/ingresar/:id",
        element: <Ingresar />
      },
      {
        path: "/ppi_15/emergencia/",
        element: <Emergencia />
      },
      {
        path: "/ppi_15/emergencia/:id",
        element: <Emergencia />
      },
    ]
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router} />
    <Toaster />
    </>
  );
}

export default App;
