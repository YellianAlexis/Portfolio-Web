import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import experiences from "../data/experiences.jsx";
import "../assets/css/experience.css";

// MUI Components Timeline
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function Experience() {
  const items = experiences;
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode } = useTheme(); // Usa el contexto del tema
  
  // Cambia el estado de isMobile si el ancho de la ventana es menor o igual a 768px
  useEffect(() => {
    // Función para verificar el tamaño de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px es el tamaño típico para cambiar a móvil
    };

    // Escuchar el evento de cambio de tamaño
    window.addEventListener('resize', handleResize);

    // Ejecutar la función una vez al cargar el componente
    handleResize();

    // Limpieza al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cambia el color de fondo dependiendo del tema
  var bgColor = isDarkMode ? "#39ff14" : "rebeccapurple";
  var txtColor = isDarkMode ? "#fff" : "#000";
  var color = isDarkMode ? "#000000" : "#ffffff";

  return (
    <section id="experiencia" className="experience__content optimized">
      <div className="experience__container">
        <h2>Experiencia</h2>
        <Timeline position={isMobile ? "right" : "alternate"} sx={{ padding: "0 15px", margin: '0', width: '90%' }}>
          {items.map((item, index) => (
            <TimelineItem key={index} sx={ isMobile ? {display: "block", justifyItems: "center", padding: "30px 0", borderTop: `1px solid ${bgColor}`} : {display: "flex"} }>
              <TimelineOppositeContent
                sx={{
                  m: "auto 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: txtColor,
                  textWrap: "nowrap"
                }}
              >
                {item.title}
              </TimelineOppositeContent>
              <TimelineSeparator sx={{ m: "0 15px" }}>
                <TimelineConnector sx={{ bgcolor: bgColor }} />
                <TimelineDot
                  sx={{ bgcolor: bgColor, color: color, fontSize: "20px" }}
                >
                  {item.icon ? item.icon : ""}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                sx={{ m: "15px 0", py: "10px", px: 2, backgroundColor: `${color}80`, borderRadius: '10px', boxShadow: '4px 8px 10px #000', overflow: 'hidden', 
                  textAlign: 'left', backdropFilter: 'blur(4px)'}}
              >
                <h4 className="experience__content__cardTitle">
                  {item.cardTitle}
                </h4>
                <h6 className="experience__content__cardCaption">
                  {" "}
                  {item.cardCaption}
                </h6>
                <p className="experience__content__cardDetailedText">
                  {item.cardDetailedText}
                </p>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
