import "./Header.css";
import { HeaderSection } from './HeaderSection';
import { useSectionsActions } from '../hooks/sectionsActions.js';
import { useContext } from 'react';
import { useTheme } from "../context/ThemeContext.jsx";
import { useLanguage } from '../context/LanguageContext.jsx';
import { CartContext } from "../context/CartContext";
import { Switch } from './Switch.jsx';

export function Header() {
    const { handleSectionsClick } = useSectionsActions();
    const { lightMode, toggleTheme } = useTheme();
    const { translate, toggleTranslate } = useLanguage();
    const { cart } = useContext(CartContext)

    return (
        <header className="site-header">
            <h1 className="site-logo">
                <img src="../public/team.png" alt="Honyro" />
                <span className="visually-hidden">Honyro</span>
            </h1>

            <hr className="header-divider"/>

            <nav className="site-nav" aria-label="Navegación principal">
                <ul className="nav-list">
                    <HeaderSection icon="home" action={() => handleSectionsClick('home')} />
                    <HeaderSection icon="grade" action={() => handleSectionsClick('feature')} />
                    <HeaderSection icon="search" action={() => handleSectionsClick('search')}/>

                    <hr className="header-divider"/>

                    <HeaderSection icon="groups" action={() => handleSectionsClick('about')} />
                    
                    <hr className="header-divider"/>

                    <div className="language-switch-container">
                        <HeaderSection icon={'language'} label='' action={toggleTranslate}/>
                        <Switch
                            checked={translate}
                            onChange={toggleTranslate}
                            className="language"
                        />
                        
                    </div>
                    <HeaderSection icon={!lightMode ? "dark_mode" : "light_mode"} label='' action={toggleTheme}/>
                </ul>

                <button onClick={() => handleSectionsClick('cart')} className="icon-button cart-button" aria-label="Abrir carrito">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    {
                        cart.length > 0 && <span className="cart-count">{cart.length}</span>
                    }
                </button>
            </nav>
        </header>
    );

}
