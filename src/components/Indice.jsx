import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/indiceStyles.css";
import resumenes from "../data/proyectos.json";
import NavigationButtons from "./NavigationButtons";

function Indice() {
  const location = useLocation();
  const { mode } = location.state || { mode: "light" };
  const indice = mode === "dark" ? "desarrollo" : "diseño";

  const [popup, setPopup] = useState({
    visible: false,
    item: null,
    x: 0,
    y: 0,
  });

  const [showItems, setShowItems] = useState([]); // Estado para controlar los elementos mostrados

  const handleMouseEnter = (e, item) => {
    const { clientX, clientY } = e;
    setPopup({
      visible: true,
      item: item,
      x: clientX,
      y: clientY,
    });
  };

  const handleMouseLeave = () => {
    setPopup({ visible: false, item: null, x: 0, y: 0 });
  };

  const filteredItems = resumenes.items.filter(
    (item) => item.indice === indice
  );

  // useEffect para mostrar los elementos al entrar en el índice
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowItems(filteredItems.map((_, index) => index)); // Mostrar todos los índices
    }, 100); // Esperar un poco antes de mostrar los elementos

    return () => clearTimeout(timer); // Limpiar el timer al desmontar
  }, [filteredItems]);

  return (
    <div className={`indice-container ${mode}`}>
      <NavigationButtons />
      <div className={`indice-title ${mode}`}>
        <p>{indice}</p>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list">
            {filteredItems.map((item, index) => (
              <li
                className={`list-item ${
                  showItems.includes(index) ? "show" : ""
                }`} // Añade la clase "show" si está incluido
                key={item.id}
              >
                <Link
                  to={item.url}
                  state={{ mode }}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onMouseEnter={(e) => handleMouseEnter(e, item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <h1>{item.titulo}</h1>
                  <h4>{item.subtitulo}</h4>
                  <p>{item.resumen}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {popup.visible && popup.item && (
        <div
          className="popup-card"
          style={{
            position: "absolute",
            top: popup.y + 10,
            left: popup.x + 10,
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "250px",
          }}
        >
          <img
            src={popup.item.img}
            alt={popup.item.titulo}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "5px 5px 0 0",
            }}
          />
          <h4 style={{ margin: "10px 0" }}>{popup.item.titulo}</h4>
          <p style={{ fontSize: "0.9em", marginBottom: "0" }}>
            {popup.item.resumen}
          </p>
        </div>
      )}
    </div>
  );
}

export default Indice;
