import { createContext, useContext, useMemo, useState } from 'react';

const SearchWindowContext = createContext(null);

export function SearchWindowProvider({ children }) {
    const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);


    const value = useMemo(() => ({
        isSearchWindowOpen,
        setIsSearchWindowOpen
    }), [isSearchWindowOpen]);

    return (
        <SearchWindowContext.Provider value={value}>
            {children}
        </SearchWindowContext.Provider>
    );
}

export function useSearchWindow() {
    const ctx = useContext(SearchWindowContext);
    if (!ctx) {
        throw new Error(
            'useSearchWindow debe usarse dentro de <SearchWindowProvider>. ' +
            'Envuelve tu árbol en el provider.'
        );
    }
    return ctx;
}

export { SearchWindowContext };
