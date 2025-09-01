import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [lightMode, setLightMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (lightMode) root.classList.add('light');
        else root.classList.remove('light');
    }, [lightMode]);

    const toggleTheme = () => setLightMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ lightMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
