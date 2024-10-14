import "../styles/homeStyles.css";
import { useEffect, useRef, useState, Suspense, lazy } from "react";
import Buttons from "./Buttons.jsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Spline = lazy(() => import("@splinetool/react-spline"));

function HomePage() {
  const refText1 = useRef();
  const refText2 = useRef();
  const refDesing = useRef();
  const refDevelop = useRef();
  const refFlechaIzq = useRef();
  const refFlechaDer = useRef();

  const [isSplineLoaded, setSplineLoaded] = useState(false); // Para controlar cuando ya cargó

  // Primer useEffect: Precarga del archivo de Spline
  useEffect(() => {
    // Precargar el archivo de Spline
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "https://prod.spline.design/yymhHFAN-Q0A1d6Q/scene.splinecode";
    link.as = "fetch"; // Se carga como un recurso para JavaScript
    link.crossOrigin = "anonymous"; // Agregar el atributo crossorigin
    document.head.appendChild(link);

    // Cuando el recurso se ha cargado, indicamos que Spline está listo
    link.onload = () => {
      setSplineLoaded(true);
    };

    return () => {
      // Limpiamos el recurso precargado al desmontar el componente
      document.head.removeChild(link);
    };
  }, []); // Este useEffect solo corre al montar el componente

  // Segundo useEffect: Lógica para la animación de las caras y el texto con el mouse
  useEffect(() => {
    const text1 = refText1.current;
    const text2 = refText2.current;
    const desing = refDesing.current;
    const develop = refDevelop.current;

    const flechaIzq = refFlechaIzq.current;
    const flechaDer = refFlechaDer.current;

    const screenWidth = window.innerWidth - 100;
    const maxWidth = screenWidth / 2;

    desing.style.width = `${screenWidth / 4}px`;
    develop.style.width = `${screenWidth / 4}px`;

    const bodyElement = document.querySelector("body");
    let prevX = 0;

    const changeFace = (e) => {
      const xDirection = getMouseDirection(e);
      const face1Width = desing.offsetWidth;
      const face2Width = develop.offsetWidth;

      if (xDirection === "left") {
        moveRight(face1Width, face2Width);
      } else {
        moveLeft(face1Width, face2Width);
      }
    };

    const getMouseDirection = (e) => {
      const currentX = e.pageX;
      const direction = prevX < currentX ? "right" : "left";
      prevX = currentX;
      return direction;
    };

    const moveLeft = (face1Width, face2Width) => {
      if (face2Width < maxWidth) {
        develop.style.width = `${face2Width + 10}px`;
        desing.style.width = `${face1Width - 10}px`;

        const percentage1 = getPercentage(face1Width, screenWidth / 4) / 100;
        text1.style.opacity = percentage1 > 0.2 ? percentage1 : 0;
        flechaIzq.style.opacity = text1.style.opacity;

        const percentage2 = getPercentage(face2Width, screenWidth / 4) / 100;
        text2.style.opacity = percentage2 > 0.2 ? percentage2 : 0;
        flechaDer.style.opacity = text2.style.opacity;
      }
    };

    const moveRight = (face1Width, face2Width) => {
      if (face1Width < maxWidth) {
        desing.style.width = `${face1Width + 10}px`;
        develop.style.width = `${face2Width - 10}px`;

        const percentage1 = getPercentage(face1Width, screenWidth / 4) / 100;
        text1.style.opacity = percentage1 > 0.2 ? percentage1 : 0;
        flechaIzq.style.opacity = text1.style.opacity;

        const percentage2 = getPercentage(face2Width, screenWidth / 4) / 100;
        text2.style.opacity = percentage2 > 0.2 ? percentage2 : 0;
        flechaDer.style.opacity = text2.style.opacity;
      }
    };

    const getPercentage = (width, total) => {
      return (width * 100) / total;
    };

    // Añadimos el event listener cuando se monta el componente
    bodyElement.addEventListener("mousemove", changeFace, false);

    // Limpiamos el event listener cuando el componente se desmonta
    return () => {
      bodyElement.removeEventListener("mousemove", changeFace);
    };
  }, []); // Este useEffect también corre solo cuando el componente se monta

  return (
    <div className="container-fluid homeBody">
      <abbr title="Emojis interactivos">
        <Suspense fallback={<div>Cargando animación...</div>}>
          {isSplineLoaded && (
            <Spline scene="https://prod.spline.design/yymhHFAN-Q0A1d6Q/scene.splinecode" />
          )}
        </Suspense>
      </abbr>

      <div className="row">
        <div className="text col-lg-3" id="text1" ref={refText1}>
          <Link
            to="/indice"
            state={{ mode: "light" }}
            className="arrows arrowLeft"
            style={{ opacity: "1" }}
            ref={refFlechaIzq}
          >
            <IoIosArrowBack />
          </Link>
          <div className="textDesigner">
            <h1>DISEÑADOR</h1>
            <p>Descubre un poco más acerca de mi creatividad.</p>
          </div>
        </div>
        <div className="faces col-lg-6" id="faces">
          <div className="face" id="face1" ref={refDesing}></div>
          <div className="face" id="face2" ref={refDevelop}></div>
        </div>
        <div className="text col-lg-3" id="text2" ref={refText2}>
          <div className="textDeveloper">
            <h1>DESARROLLADOR</h1>
            <p>Visita mis proyectos como desarrollador web.</p>
          </div>
          <Link
            to="/indice"
            state={{ mode: "dark" }}
            className="arrows arrowRight"
            style={{ opacity: "1" }}
            ref={refFlechaDer}
          >
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
      <div className="row botones">
        <Buttons clase="btn_contact" title="contacto" />
        <Buttons clase="btn_about" title="sobre mi" />
      </div>
    </div>
  );
}

export default HomePage;
