import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoHome } from "react-icons/io5";

function NavigationButtons() {
  const navigate = useNavigate(); // Hook para la navegación

  // Función para ir a la página anterior
  const goBack = () => {
    navigate(-1); // -1 para volver a la página anterior
  };

  // Función para ir a la página Home
  const goHome = () => {
    navigate("/"); // '/' para ir a la página de inicio
  };

  return (
    <div className="btn-root">
      <button className="goBack" onClick={goBack}>
        <IoIosArrowBack />
      </button>
      <button className="goHome" onClick={goHome}>
        <IoHome />
      </button>
    </div>
  );
}

export default NavigationButtons;
