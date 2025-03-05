import { ThemeProvider } from "./context/ThemeContext.jsx";

import "./App.css";
import BackgroundAnimation from "./components/BackgroundAnimation.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Stack from "./components/Stack.jsx";
import Footer from "./components/Footer.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";

export default function App() {
  return (
    <section className="App">
      <ThemeProvider>
        <div className="background__animation__container">
          <BackgroundAnimation className="app__background" />
        </div>
        <Header />
        <main>
          <Hero />
          <Projects />
          <Experience />
          <Stack />
        </main>
        <Footer />
        <BackToTopButton />        
      </ThemeProvider>
    </section>
  );
}
