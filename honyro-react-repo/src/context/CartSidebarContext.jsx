import { createContext, useState } from 'react';

const CartSidebarContext = createContext();

const CartSidebarProvider = ({ children }) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);

    return (
        <CartSidebarContext.Provider value={{ cartIsOpen, setCartIsOpen}}>
            {children}
        </CartSidebarContext.Provider>
    );
};

export { CartSidebarProvider, CartSidebarContext };