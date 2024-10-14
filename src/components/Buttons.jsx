import { useNavigate } from "react-router-dom";

export function Buttons({ clase, title }) {
  const navigate = useNavigate(); // Hook para la navegación programática

  function handlerClick() {
    navigate("/" + title); // Navega a la ruta indicada por "title"
  }

  return (
    <button onClick={handlerClick} type="button" className={`${clase}`}>
      <span>{title}</span>
    </button>
  );
}

export default Buttons;