import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [translate, setTranslate] = useState(false);
    const toggleTranslate = () => setTranslate(prev => !prev);

    return (
        <LanguageContext.Provider value={{ translate, toggleTranslate }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
