import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
import resumenes from "../data/proyectos.json"; // Importamos el archivo JSON con los proyectos
import "../styles/proyectsStyles.css";

const Proyectos = () => {
  const { id } = useParams(); // Obtenemos el ID del proyecto desde la URL
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para obtener el estado actual
  const { mode } = location.state || { mode: "light" }; // Obtenemos el modo actual ("dark" o "light")

  // const [expanded, setExpanded] = useState(false); // Controla si el resumen está expandido

  // Convertir el ID a número para buscar el proyecto correcto
  const projectId = parseInt(id);

  // Filtrar proyectos según el modo actual
  const filteredProjects = resumenes.items.filter(
    (item) => item.indice === (mode === "dark" ? "desarrollo" : "diseño")
  );

  // Buscar el proyecto actual en la lista filtrada
  const currentProject = filteredProjects.find((item) => item.id === projectId);

  // Función para mostrar el siguiente proyecto dentro del mismo "mode"
  const handleNextProject = () => {
    const currentIndex = filteredProjects.findIndex(
      (item) => item.id === projectId
    );
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    const nextProject = filteredProjects[nextIndex];

    // Navegar al siguiente proyecto dentro del mismo "mode"
    navigate(`/proyecto/${nextProject.id}`, { state: { mode } });
  };

  // Función para mostrar el proyecto anterior dentro del mismo "mode"
  const handlePreviousProject = () => {
    const currentIndex = filteredProjects.findIndex(
      (item) => item.id === projectId
    );

    // Si el índice actual es 0, el índice anterior debería ser el último proyecto
    const prevIndex =
      currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;

    const prevProject = filteredProjects[prevIndex];

    // Navegar al proyecto anterior dentro del mismo "mode"
    navigate(`/proyecto/${prevProject.id}`, { state: { mode } });
  };

  // Función para manejar "ver más" y "ver menos"
  // const toggleReadMore = () => {
  //   setExpanded(!expanded);
  // };

  if (!currentProject) {
    return <p>Proyecto no encontrado</p>;
  }

  return (
    <div className={`project-container ${mode}`}>
      <div className="project-card">
        <div className="project-content">
          <h1>{currentProject.titulo}</h1>
          <h2>{currentProject.subtitulo}</h2>
          <p>{currentProject.resumen}</p>
          <p>
            {currentProject.contenido.map((texto, index) => (
              <p key={index}>{texto}</p> // Mostrar todo el contenido cuando está expandido
            ))}
            {/* {expanded
              ? currentProject.contenido.map((texto, index) => (
                  <p key={index}>{texto}</p> // Mostrar todo el contenido cuando está expandido
                ))
              : currentProject.contenido.slice(0, 1).map(
                  (
                    texto,
                    index // Mostrar solo el primer elemento
                  ) => (
                    <p key={index}>
                      {texto.length > 150
                        ? `${texto.substring(0, 150)}...`
                        : texto}
                    </p>
                  )
                )} */}
            {/* <span
              onClick={toggleReadMore}
              type="button"
              className="btn-read-more"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </span> */}
          </p>
          <div className="project-navigation">
            {/* Botón para volver al índice con el estado del mode */}
            <button
              onClick={() => navigate("/indice", { state: { mode } })}
              className="btn-back"
            >
              Volver al índice
            </button>
            <button onClick={handlePreviousProject} className="btn-prev">
              Anterior Proyecto
            </button>
            <button onClick={handleNextProject} className="btn-next">
              Siguiente Proyecto
            </button>
          </div>
        </div>
        <div className="project-img">
          <img
            src={currentProject.img}
            alt={currentProject.titulo}
            className="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
