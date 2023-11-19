import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

import Home from './layouts/Home';
import Información from './layouts/Información';
import Conocenos from './layouts/Conocenos';
import Registro from './layouts/Registro';
import Ingresar from './layouts/Ingresar';
import Mapa from './layouts/Mapa';
import Emergencia from './layouts/Emergencia';
import Recursos from './layouts/Recursos';
import Regcitamedica from './layouts/Regcitamedica';
import Calendario from './layouts/Calendario';

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
        path: "/ppi_15/emergencia",
        element: <Emergencia />
      },
      {
        path: "/ppi_15/emergencia/:id",
        element: <Emergencia />
      },
      {
        path: "/ppi_15/map",
        element: <Mapa />
      },
      {
        path: "/ppi_15/recursos",
        element: <Recursos />
      },
      {
        path: "/ppi_15/Regcitamedica",
        element: <Regcitamedica />
      },
      {
        path: "/ppi_15/Regcitamedica/:id",
        element: <Regcitamedica />
      },
      {
        path: "/ppi_15/calendario",
        element: <Calendario />
      },
      {
        path: "/ppi_15/calendario/:id",
        element: <Calendario />
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
