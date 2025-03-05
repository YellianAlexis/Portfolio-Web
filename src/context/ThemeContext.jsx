import { createContext, useState, useEffect, useContext } from "react";

// Crear el contexto de tema
const ThemeContext = createContext();

// Crear el proveedor de tema que envolverá los componentes
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Al montar el componente, comprobar si hay un tema guardado en el localStorage
  // Si no hay ninguno, comprobar si el sistema operativo del usuario tiene configurado un tema oscuro
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark"); 
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Cada vez que cambie el estado del tema, lo guardamos en el localStorage
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Función para alternar entre temas
  const toggleTheme = () => {
    // Comprobar si el navegador soporta View Transitions
    if (!document.startViewTransition) {
      setIsDarkMode(prev => !prev); // Cambiar el estado del tema
      return;
    }
  
    // Iniciar la transición de vista
    document.startViewTransition(() => {
      setIsDarkMode(prev => !prev);
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto de tema
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;