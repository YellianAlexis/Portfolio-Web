import { useState } from "react";
import projects from "../data/projects.json";
import { IoClose } from "react-icons/io5";
import "../assets/css/projects.css";
import "../assets/css/modal.css";

export default function Projects() {
  const projectsTypes = ["desarrollo", "diseño"];
  const listProjects = projects.items;

  const [activeTab, setActiveTab] = useState(projectsTypes[0]); // Estado para la pestaña activa
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal
  const [selectedProject, setSelectedProject] = useState(""); // Almacena el proyecto seleccionado

  // Función para cambiar la pestaña activa
  const openTab = (newTab) => {
    setActiveTab(newTab); // Actualiza el estado con la pestaña seleccionada
  };

  // Filtrar proyectos según el modo actual
  const filteredProjects = listProjects.filter(
    (item) => item.indice === activeTab
  );

  // Función para abrir el modal
  function showModal(project) {
    setSelectedProject(project); // Guardamos el proyecto seleccionado
    setIsModalOpen(true);
  }

  // Función para cerrar el modal
  function closeModal() {
    setIsModalOpen(false);
    setSelectedProject(""); // Limpiamos el proyecto seleccionado
  }

  return (
    <section id="proyectos" className="projects__content optimized">
      <div className="projects__container">
        <h2 data-text="projects" className="projects__title">
          Proyectos
        </h2>
        <div className="projects__container__tabs">
          <div className="tab">
            {/* Botones de las pestañas */}
            {projectsTypes.map((type, index) => (
              <button
                key={index}
                className={`tablinks ${activeTab === type ? "active" : ""}`}
                onClick={() => openTab(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Contenido de las pestañas */}
          <div className="projects__tabContent">
            {/* Tarjetas de los proyectos según el tab activo */}
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="project__tabContent__card"
                onClick={showModal.bind(this, project)}
              >
                <div className="project__tabContent__card__image">
                  <img src={project.img} alt={project.titulo} loading="lazy" />
                </div>
                <h3 className="project__tabContent__card__title">
                  {project.titulo}
                </h3>
                <h4 className="project__tabContent__card__subtitle">
                  {project.subtitulo ? ` - ${project.subtitulo}` : ""}
                </h4>
                <p className="project__tabContent__card__description">
                  {project.resumen}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Contenido modal */}
        {isModalOpen && (
          <div className="modal__overlay" onClick={closeModal}>
            <div
              className="modal__content"
              onClick={(e) => e.stopPropagation()} // Para evitar cerrar la modal cuando se hace clic en el contenido
            >
              <img
                src={selectedProject.img}
                alt={selectedProject.titulo}
                className="modal__image"
              />
              <h2 className="modal__title">{selectedProject.titulo}</h2>
              <p className="modal__text">{selectedProject.contenido}</p>

              {/* Validamos si el enlace del proyecto no está vacío  */}
              {selectedProject.enlaceProyecto === "" ? (
                ""
              ) : (
                <a
                  href={selectedProject.enlaceProyecto}
                  target="_blank"
                  rel="noreferrer"
                  className="modal__link"
                >
                  Ver proyecto
                </a>
              )}
              <button className="modal__closeButton" onClick={closeModal}>
                <IoClose />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
