import "../styles/aboutmeStyles.css";
import NavigationButtons from "./NavigationButtons";
import Buttons from "./Buttons.jsx";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons";

function AboutMePage() {
  return (
    <div className="container aboutMe">
      <NavigationButtons />
      <div className="row">
        <div className="des-personal col-8">
          <h1>Hey!</h1>
          <p>
            ¡Hola! Mi nombre es <strong>Yellian</strong>, me encantaría que
            trabajemos juntos. No soy un robot, soy un desarrollador Front-end
            apasionado por el diseño web y la programación con amplios
            conocimientos sobre diseño gráfico y marketing digital. Mi intención
            es crear sitios que atraigan y persuadan a los usuarios, generando
            conversiones relevantes para mis clientes.<br/>
            Utilizo herramientas como Adobe Photoshop, Illustrator, CorelDRAW y 
            lenguajes de programación como HTML, CSS, JavaScript y PHP para 
            asegurar que cada proyecto esté perfectamente alineado con las 
            expectativas. 
            <br/><br/>
            Además, soy un fotógrafo freelance, lo que me permite incorporar un enfoque visual
            único en los proyectos que desarrollo, asegurando que tanto la parte gráfica como 
            técnica se integren de manera fluida. En mi tiempo libre, me gusta seguir
            formándome y aprendiendo sobre las últimas tendencias tecnológicas. 
            <br/><br/>
            Si tienes un proyecto en mente o simplemente quieres charlar sobre diseño web, no 
            dudes en contactarme!
          </p>
          <div className="socials-container">
            <a
              className="accent-color-github"
              data-social="GitHub"
              href="https://github.com/YellianAlexis"
              target="_blank"
            >
              <IconContext.Provider value={{ size: "1.5em" }}>
                <FaGithub>
                  <title>GitHub</title>
                </FaGithub>
              </IconContext.Provider>
            </a>
            <a
              className="accent-color-linkedin"
              data-social="LinkedIn"
              href="https://www.linkedin.com/in/yellianalexis-ramosmart%C3%ADn?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
            >
              <IconContext.Provider value={{ size: "1.5em" }}>
                <FaLinkedin>
                  <title>LinkedIn</title>
                </FaLinkedin>
              </IconContext.Provider>
            </a>
          </div>
        </div>
        <div className="btn-menu col-4">
          <Buttons clase="btn_contact" title="contacto" />
          <Buttons clase="btn_experience" title="experiencia" />
          <Buttons clase="btn_skills" title="habilidades" />
        </div>
      </div>
    </div>
  );
}

export default AboutMePage;
