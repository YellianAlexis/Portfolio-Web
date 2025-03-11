import { useState, useEffect } from "react";
import "../assets/css/typing-animation.css";

const TypingAnimation = () => {
  const texts = [
    "Holaa, te doy la bienvenida a mi portafolio!",
    "Llevo +4 años en el mundo del desarrollo web.",
    "Desarrollando webs con Prestashop y Wordpress.",
    "Ahora también con frameworks como React o Astro.",
    "Tengo conocimentos de diseño gráfico y marketing digital.",
    "Y mis objetivos son seguir formándome y actualizándome."
  ];

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Ciclar a través de los textos
    }, 8000); // Cambiar cada 8 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonte
  }, [texts.length]);

  return (
    <p className="typewriter" key={textIndex}>          
        {texts[textIndex]}
    </p>
  );
};

export default TypingAnimation;