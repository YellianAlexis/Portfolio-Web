import '../assets/css/background-animation.css'

// Componente que representa cada círculo
const Circle = () => <div className="circle__container"><div className="circle"></div></div>;

// Componente principal
const BackgroundAnimation = () => {
  // Generamos los círculos dinámicamente
  const circles = Array.from({ length: 100 }, (_, index) => <Circle key={index} />);

  return (
    <div className="background__container">
      {circles} {/* Renderizamos los círculos generados dinámicamente */}
    </div>
  );
};

export default BackgroundAnimation;
