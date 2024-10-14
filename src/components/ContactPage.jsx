import { useState, useEffect, Suspense, lazy } from "react";
import "../styles/contactStyles.css";
import NavigationButtons from "./NavigationButtons.jsx";
import Modal from "./Modal.jsx";
import { FaPhoneAlt } from "react-icons/fa";
import { BsEnvelopeAtFill } from "react-icons/bs";
import emailjs from 'emailjs-com';

const Spline = lazy(() => import("@splinetool/react-spline"));

function ContactPage() {
  // Estados para controlar el estado del envío y el pop-up
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCloseButtonVisible, setCloseButtonVisible] = useState(false);
  const [sendStatus, setSendStatus] = useState();
  const [isSplineLoaded, setSplineLoaded] = useState(false); // Estado para verificar si el Spline ha cargado

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Precarga del archivo .splinecode
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    // link.href = "/src/assets/img/animations/mobile-scene.splinecode";
    link.href = "https://prod.spline.design/JNhaIwcPO9LR6neg/scene.splinecode";
    link.as = "fetch";
    link.crossOrigin = "anonymous"; // Agregar el atributo crossorigin
    document.head.appendChild(link);

    link.onload = () => {
      setSplineLoaded(true); // Marcar como cargado cuando el archivo esté listo
    };

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Función para abrir el modal al enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validación de correo electrónico
    if (!validateEmail(formData.email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Sanitizar inputs para evitar inyecciones
    const sanitizedMessage = sanitizeInput(formData.message);

    setModalOpen(true); // Muestra el modal
    setCloseButtonVisible(false); // Oculta el botón de cerrar al principio
    setSendStatus("Enviando"); // Inicialmente muestra "Enviando"

    // Enviar el correo electrónico
    emailjs.send("service_s2qb22n", "template_5qepbw3", {
      name: formData.name,
      email: formData.email,
      message: sanitizedMessage
    }, "3d5MoL3-K-jjgKiXs")
    .then(() => {
      setSendStatus("Enviado"); // Cambia el texto a "Enviado"
      setCloseButtonVisible(true); // Muestra el botón de cerrar
      clearForm(); // Limpia el formulario
    })
    .catch((error) => {
      console.error("Error al enviar el correo: ", error);
      setSendStatus("Error al enviar");
    });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Función para sanitizar el mensaje
  const sanitizeInput = (input) => {
    // Reemplaza caracteres no deseados
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  // Función para limpiar el formulario
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container contact">
      <NavigationButtons />
      {/* Modal pop-up */}
      <Modal
        isActive={isModalOpen}
        close={closeModal}
        isCloseButtonVisible={isCloseButtonVisible}
        sendStatus={sendStatus}
      />
      <div className="formulario">
        <h1 className="mainName">Contáctame</h1>
        <div className="row">
          <div className="col-6">
            <p className="text">¿Quieres trabajar conmigo?</p>
            <p className="datos">
              <span className="telefono">
                <FaPhoneAlt /> +34 633 928 452
              </span>
              <span className="correo">
                <BsEnvelopeAtFill /> yellian1999@gmail.com
              </span>
            </p>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                required
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="message"
                required
                placeholder="Mensaje"
                value={formData.message}
                onChange={handleChange}
              />
              <button className="enviar" type="submit">
                Enviar
              </button>
            </form>
          </div>
          <div className="col-4">
            <div className="spline-code">
              {/* Renderiza el Spline solo si está precargado */}
              <Suspense fallback={<div>Cargando animación...</div>}>
                {isSplineLoaded && (
                  <Spline scene="https://prod.spline.design/JNhaIwcPO9LR6neg/scene.splinecode" />
                )}
              </Suspense>
            </div>
            <span className="pinchar">Haz click!</span>
          </div>
          <div className="col-2">
            <div className="QR">
              <span className="text">Escanéame!</span>
              <img
                src="/public/img/qr_cv.jpeg"
                alt="Mi CV"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
