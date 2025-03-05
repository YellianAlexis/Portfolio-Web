import { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";
import '../assets/css/backtotop-button.css';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Manejar el scroll para mostrar u ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;