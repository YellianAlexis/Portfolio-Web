import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import PageNotFound from "./views/PageNotFound.jsx";
import Indice from "./components/Indice.jsx";
import ContactPage from "./components/ContactPage.jsx";
import AboutMePage from "./components/AboutMePage.jsx";
import LinetimePage from "./components/LinetimePage.jsx";
import ProyectPage from "./components/ProyectPage.jsx";
import Skills from "./components/Skills.jsx";

// Configuración de rutas
const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/indice",
    element: <Indice />,
  },
  {
    path: "/contacto",
    element: <ContactPage />,
  },
  {
    path: "/sobre mi",
    element: <AboutMePage />,
  },
  {
    path: "/proyecto/:id",
    element: <ProyectPage />,
  },
  {
    path: "/experiencia",
    element: <LinetimePage />,
  },
  {
    path: "/habilidades",
    element: <Skills />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;