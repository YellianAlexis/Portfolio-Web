import { useEffect, useRef } from "react";
import { FaTelegramPlane } from "react-icons/fa";

function Modal({ isActive, close, isCloseButtonVisible, sendStatus }) {
  const refProgressContainer = useRef();
  const refBar = useRef();
  const refProgressContent = useRef();
  const progressInterval = useRef(null); // Para controlar el intervalo
  const progress = useRef(0); // Controlar el estado del progreso

  useEffect(() => {
    if (isActive) {
      const progressContainer = refProgressContainer.current;
      const progressBar = refBar.current;
      const progressContent = refProgressContent.current;
      progress.current = 0; // Resetear el progreso cada vez que el modal se abra
      const intervalTime = 225; // 5 segundos / (100 / 5) = 250 ms por múltiplo de 5%

      // Inicializar barra y texto
      progressBar.style.width = "0%";
      progressContent.innerHTML = `<p class="bar-text">${sendStatus}<span class="dots">...</span> 0%</p>`;

      // Función para actualizar la barra de progreso
      // eslint-disable-next-line no-inner-declarations
      function updateProgress() {
        if (progress.current <= 100) {
          progressBar.style.width = `${progress.current}%`;
          progressContent.innerHTML = `<p class="bar-text">${sendStatus}<span class="dots">...</span> ${progress.current}%</p>`;
          progress.current += 5; // Incrementar en múltiplos de 5
        } else {
          clearInterval(progressInterval.current); // Limpiar el intervalo cuando llega al 100%
          progressBar.style.display = "none"; // Ocultar la barra de progreso
          progressContainer.innerHTML = `<p class="bar-text">${sendStatus}</p>`; // Mostrar solo el texto del estado
        }
      }

      // Iniciar la animación con un intervalo
      progressInterval.current = setInterval(updateProgress, intervalTime);
    }

    // Cleanup: Limpiar el intervalo cuando el modal se cierra
    return () => {
      clearInterval(progressInterval.current); // Evitar que el intervalo quede corriendo
    };
  }, [isActive, sendStatus]);

  return (
    <div className={`wrapper modal ${isActive ? "active" : ""}`}>
      <div className="modal-content">
        {/* Elementos gráficos del sobre */}
        <div className="envelop">
          <div className="strike"></div>
          <div className="strike strike2"></div>
          <div className="strike strike3"></div>
          <div className="strike strike4"></div>
          <div className="strike strike5"></div>
          <div className="avion envelop-detail">
            <FaTelegramPlane />
          </div>
        </div>
        {/* Contenedor de la barra de progreso */}
        <div className="progress-container" ref={refProgressContainer}>
          <div className="progress-bar" id="progressBar" ref={refBar}>
            <div className="progress-content" ref={refProgressContent}>
              {/* Contenido dinámico de la barra de progreso se genera por innerHTML */}
            </div>
          </div>
        </div>

        {isCloseButtonVisible && (
          <button className="closeBtn" onClick={close}>
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;
