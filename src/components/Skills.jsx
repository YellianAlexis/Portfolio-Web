import "../styles/skillsStyles.css";
import { useEffect, useRef } from "react";
import NavigationButtons from "./NavigationButtons";
import Buttons from "./Buttons.jsx";

function AboutMePage() {
  const sombreado = useRef(null);

  useEffect(() => {
    const conteDegradado = sombreado.current;
    const sizeDegradado = 150;
    conteDegradado.style.background = `radial-gradient(circle at 40px 40px, transparent 0%, black ${sizeDegradado}px)`;

    conteDegradado.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      conteDegradado.style.cursor = "none";
      conteDegradado.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 0%, black ${sizeDegradado}px)`;
    });
  }, [sombreado]);

  return (
    <>
      <div id="bg-mask" ref={sombreado}></div>
      <div className="container skills">
        <NavigationButtons />
        <div className="btn-menu">
          <Buttons clase="btn_contact" title="contacto" />
          <Buttons clase="btn_about" title="sobre mi" />
          <Buttons clase="btn_experience" title="experiencia" />
        </div>
      </div>
    </>
  );
}

export default AboutMePage;
