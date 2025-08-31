import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const ProductWindowContext = createContext();

// 2. Crear el proveedor
export function ProductWindowProvider({ children }) {
    const [productWindow, setProductWindow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openProductWindow = (product) => {
        setSelectedProduct(product);
        setProductWindow(true);
    };

    const closeProductWindow = () => {
        setSelectedProduct(null);
        setProductWindow(false);
    };

    return (
        <ProductWindowContext.Provider
            value={{
                productWindow,
                selectedProduct,
                openProductWindow,
                closeProductWindow,
            }}
        >
            {children}
        </ProductWindowContext.Provider>
    );
}

// 3. Crear un custom hook para usar el contexto
export function useProductWindow() {
    const context = useContext(ProductWindowContext);
    if (!context) {
        throw new Error("useProductWindow debe usarse dentro de un ProductWindowProvider");
    }
    return context;
}


export { ProductWindowContext };