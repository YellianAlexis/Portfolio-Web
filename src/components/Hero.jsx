import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import TypingAnimation from "./TypingAnimation.jsx";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import "../assets/css/hero.css";

export default function Hero() {
  const [isRotating, setIsRotating] = useState(false);
  const {isDarkMode} = useTheme();

  // Maneja el clic para iniciar el giro
  const handleImageClick = () => {
    setIsRotating(!isRotating); // Alterna el estado del giro
  };

  return (
    <section id="hero" className="hero__content">
      <div className="hero__profile">
        <div className="hero__profile__description">
          <h1 className="hero__profile__description__title">
            Yellian Alexis Ramos Martín
          </h1>
          <p className="hero__profile__description__caption">
            frontend web developer
          </p>
          <TypingAnimation/>
          <ul className="hero__profile__description__social">
            <li className="relative">
              <a
                aria-label="GitHub"
                data-social="GitHub"
                rel="nofollow noreferrer"
                target="_blank"
                href="https://github.com/YellianAlexis"
                className="accent-color-github"
              >
                <FaGithub className="social-logo">
                  <title>GitHub</title>
                </FaGithub>
              </a>
            </li>
            <li className="relative">
              <a
                aria-label="LinkedIn"
                data-social="LinkedIn"
                rel="nofollow noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/yellianramos"
                className="accent-color-linkedin"
              >
                <FaLinkedin className="social-logo">
                  <title>LinkedIn</title>
                </FaLinkedin>
              </a>
            </li>
            <li className="relative">
              <a
                aria-label="Descargar CV"
                data-social="Descargar CV"
                rel="nofollow noreferrer"
                target="_blank"
                href="/pdf/cv-yellian-alexis-ramos-martin.pdf"
                className="accent-color-pdf"
              >
                <FaRegFilePdf className="social-logo">
                  <title>Descargar CV</title>
                </FaRegFilePdf>
              </a>
            </li>
            <li className="relative">
              <a
                aria-label="Correo electrónico"
                data-social="yellian1999@gmail.com"
                rel="nofollow noreferrer"
                target="_blank"
                href="mailto:yellian1999@gmail.com?subject=Mensaje de contacto desde portafolio&body=Hola Yellian, me gustaría contactar contigo para...Un saludo."
                className="accent-color-correo"
              >
                <IoIosMail className="social-logo">
                  <title>Gmail</title>
                </IoIosMail>
                {/* <span style={{ fontSize: "12px", textDecoration: "none" }}>
                  yellian1999@gmail.com
                </span> */}
              </a>
            </li>
          </ul>
        </div>
        <div className="hero__profile__image">
          <img
            id="yarm-img"
            title="yellian alexis"
            src={isDarkMode ? "/images/yellian_web_dark-black.webp" : "/images/yellian_web_light-white.webp"}
            alt="imagen perfil yellian"
            width="250"
            height="250"
            className={`${isRotating ? "rotate" : ""}`}
            onClick={handleImageClick}
          />
          <span className="username">Yellian Alexis</span>
        </div>
      </div>
    </section>
  );
}
