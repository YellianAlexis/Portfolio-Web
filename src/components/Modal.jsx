import { useState } from "react";
import { IoClose } from "react-icons/io5";
import "../assets/css/modal.css";

export default function Modal({ isOpen, closeModal }) {
  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const err = "";

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de correo electrónico
    if (!validateEmail(formData.email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Sanitizar inputs para evitar inyecciones
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedMessage = sanitizeInput(formData.message);

    // Enviar formulario
    mailTo(sanitizedName, formData.email, sanitizedMessage);
    alert("Mensaje enviado correctamente.");

    clearForm();
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
      name: "",
      email: "",
      message: "",
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

  if (!isOpen) return null;

  return (
    <div id="formModal" className="modal__overlay" onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Contacto</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
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
          <textarea
            name="message"
            required
            placeholder="Mensaje"
            value={formData.message}
            onChange={handleChange}
          />
          <button className="btnSubmit font-bold" disabled>
            <abbr title="No disponible todavía">Enviar</abbr>
          </button>
        </form>

        {/* Mensaje de confirmación */}
        {err !== "" && (
          <p id="formMessage" style={{ color: "red" }}>
            {err}
          </p>
        )}
        <p
          id="formMessage"
          style={{ display: "none", color: err === "" ? "green" : "red" }}
        >
          {err === ""
            ? "Gracias por contactarme, te responderé lo más pronto posible."
            : "Por favor, completa todos los campos."}
        </p>

        <button className="modal__closeButton" onClick={closeModal}>
          <IoClose />
        </button>
      </div>
    </div>
  );
}
