import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx"; // Importa el hook personalizado
import Modal from "./Modal.jsx";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import "../assets/css/header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú hamburguesa está abierto
  const menuRef = useRef(null); // Referencia para el menú
  const { isDarkMode, toggleTheme } = useTheme(); // Usa el contexto del tema
  const [isSoundEnabled, setIsSoundEnabled] = useState(false); // Estado para controlar si el sonido está activado o no (por defecto desactivado)
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal de contacto

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar el menú cuando se hace clic fuera
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Cierra el menú si se hace clic fuera
    }
  };

  // Agregar el evento de clic al documento
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  let userInteracted = false; // Variable para controlar si el usuario ha interactuado con la página

  useEffect(() => {
    const hoverSound = document.getElementById("hoverSound");
    const actionSound = document.getElementById("actionSound");

    const enableSounds = () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      userInteracted = true;
      document.removeEventListener("click", enableSounds);
    };

    // Escuchar el primer clic o interacción para habilitar los sonidos
    document.addEventListener("click", enableSounds);

    const playHoverSound = () => {
      if (userInteracted && isSoundEnabled) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch((error) => {
          console.error("Error playing hover sound:", error);
        });
      }
    };

    const playActionSound = () => {
      if (userInteracted && isSoundEnabled) {
        actionSound.currentTime = 0;
        actionSound.play().catch((error) => {
          console.error("Error playing action sound:", error);
        });
      }
    };

    const menuItems = document.querySelectorAll(".header__menu__container li");

    menuItems.forEach((item) => {
      item.addEventListener("mouseenter", playHoverSound);
      item.addEventListener("click", playActionSound);
    });

    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("mouseenter", playHoverSound);
        item.removeEventListener("click", playActionSound);
      });
      document.removeEventListener("click", enableSounds);
    };
  }, [isSoundEnabled]); // Escuchar cambios en isSoundEnabled

  // Función para manejar el scroll suave
  // al hacer clic en un enlace del menú
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Función para alternar el estado del sonido
  // al hacer clic en el icono de sonido
  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev); // Alternar el estado del sonido
  };

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  const handleMenuClick = (e, section) => {
    if (section === "contacto") {
      openModal(e); // Abre la modal
      setIsMenuOpen(false); // Cierra el menú
    } else {
      handleScroll(e, section); // Ejecuta la función de scroll
      setIsMenuOpen(false); // Cierra el menú
    }
  };

  return (
    <header className="header__menu">
      <nav className="header__menu__container">
        {/* Ícono de menú hamburguesa para dispositivos móviles */}
        <div className="header__menu__mobile__icon" onClick={toggleMenu}>
          {isMenuOpen ? (
            <AiOutlineClose
              className="close-icon"
              size={30}
              style={{ position: "fixed", left: "2em" }}
            />
          ) : (
            <AiOutlineMenu className="open-icon" size={30} />
          )}
        </div>
        <ul
          ref={menuRef}
          className={`header__menu__list ${isMenuOpen ? "open" : "closed"}`}
        >
          <li>
            <a
              href="#proyectos"
              onClick={(e) => handleMenuClick(e, "proyectos")}
            >
              proyectos
            </a>
          </li>
          <li>
            <a
              href="#experiencia"
              onClick={(e) => handleMenuClick(e, "experiencia")}
            >
              experiencia
            </a>
          </li>
          <li>
            <a href="#stack" onClick={(e) => handleMenuClick(e, "stack")}>
              stack
            </a>
          </li>
          <li>
            <a href="#contacto" onClick={(e) => handleMenuClick(e, "contacto")}>
              contacto
            </a>
          </li>

          {/* Control de sonido */}
          <li
            className="icon sound-icon"
            onClick={toggleSound}
            style={{ cursor: "pointer" }}
          >
            {isSoundEnabled ? (
              <IoVolumeHigh className="mode sound" />
            ) : (
              <IoVolumeMute className="mode sound" />
            )}
          </li>

          {/* Modo de luz */}
          <li
            className="icon light-icon"
            onClick={toggleTheme}
            style={{ cursor: "pointer" }}
          >
            {isDarkMode ? (
              <MdDarkMode className="mode darkMode" />
            ) : (
              <BsBrightnessHighFill className="mode ligthMode" />
            )}
          </li>

          <audio id="hoverSound" src="/sound/button.mp3"></audio>
          <audio id="actionSound" src="/sound/action.mp3"></audio>
        </ul>
      </nav>

      {/* Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}
