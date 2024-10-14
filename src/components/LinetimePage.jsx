import { Chrono } from "react-chrono";
import "../styles/linetimeStyles.css";
import NavigationButtons from "./NavigationButtons";
import experiencias from "../data/experiencias.jsx";
import { PiStudentBold } from "react-icons/pi";
import { ImBriefcase } from "react-icons/im";
import { FaCameraRetro } from "react-icons/fa";
import { IconContext } from "react-icons";

const LinetimePage = () => {
  return (
    <>
      <NavigationButtons />
      <Chrono
        items={experiencias}
        mode="VERTICAL_ALTERNATING"
        cardHeight={200}
        timelinePointDimension={30}
        slideShow
        slideItemDuration={4000}
        theme={{
          primary: "#1453A2",
          secondary: "#FC703C", 
          cardBgColor: "#f5f5f5",
          titleColor: "#000",
          titleColorActive: "#fff",
        }}
        fontSizes={{
          cardSubtitle: "1rem",
          cardText: "0.8rem",
          cardTitle: "1.2rem",
          title: "1rem",
        }}
        buttonTexts={{
          first: "Ir a la primera",
          last: "Ir hasta el final",
          next: "Siguiente",
          play: "Reproducir presentación de diapositivas",
          previous: "Anterior",
          jumpTo: "Ir a",
          changeLayout: "Cambiar diseño",
          changeDensity: "Cambiar densidad",
        }}
      >
        <div className="chrono-icons">
          <IconContext.Provider
            value={{ color: "#FC703C", size: "1.5em" }}
          >
            <ImBriefcase />
          </IconContext.Provider>
          <IconContext.Provider
            value={{ color: "#FC703C", size: "1.5em" }}
          >
            <FaCameraRetro />
          </IconContext.Provider>
          <IconContext.Provider
            value={{ color: "#FC703C", size: "1.5em" }}
          >
            <PiStudentBold />
          </IconContext.Provider>
          ;
        </div>
      </Chrono>
    </>
  );
};

export default LinetimePage;
