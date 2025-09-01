// hooks/useSidebarActions.js
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartSidebarContext } from '../context/CartSidebarContext'; 
import { SearchWindowContext } from '../context/SearchWindowContext';


export function useSectionsActions() {
    const navigate = useNavigate();
    const {setCartIsOpen} = useContext(CartSidebarContext);
    const {setIsSearchWindowOpen} = useContext(SearchWindowContext)

    const goToTop = () => {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id) => {
        navigate('/');
    
        let tries = 0;
        const maxTries = 60; // ~1s a 60fps
    
        const tick = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            if (tries++ < maxTries) {
                requestAnimationFrame(tick);
            }
        };
    
        requestAnimationFrame(tick);
    };
    

    const openCartModal = () => {
        setCartIsOpen(true);
    };

    const searchProduct = () => {
        setIsSearchWindowOpen((prev) => !prev);
    };

    const handleSectionsClick = (action) => {
        switch (action) {
            case 'home': goToTop(); break;
            case 'about': scrollToSection('about'); break;
            case 'cart': openCartModal(); break;
            case 'search': searchProduct(); break;
            case 'feature': scrollToSection('featured'); break;
            default: console.warn(`No action for ${action}`);
        }
    };

    return {
        goToTop,
        scrollToSection,
        openCartModal,
        searchProduct,
        handleSectionsClick
    };
}
