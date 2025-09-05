import { useState } from 'react';
import './Sidebar.css'
import { SidebarSection } from './SidebarSection.jsx';
import { Switch } from './Switch.jsx';
import { Translate } from './Translate.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useSectionsActions } from '../hooks/sectionsActions.js';





export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const { lightMode, toggleTheme } = useTheme();
    const { translate, toggleTranslate } = useLanguage();
    const { handleSectionsClick } = useSectionsActions();


    return (
        <aside className={'sidebar ' + (sidebarOpen ? 'open' : 'closed')}>
            <div className="sidebar-header">
                <h1 className="site-logo">
                    <img src="/perfil.png" alt="Honyro" />
                    <span className="visually-hidden">Honyro</span>
                </h1>
                <button className="sidebar-toggle" onClick={toggleSidebar}>
                    {
                        sidebarOpen ? (
                            <span className="material-symbols-outlined">menu_open</span>
                        ) : (
                            <span className="material-symbols-outlined">menu</span>
                        )
                    }
                </button>
            </div>
        
            <div className="sidebar-content">
                
                <h2 className="sidebar-title">
                    <Translate >
                        Preferencias
                    </Translate>
                </h2>
                {
                    sidebarOpen? (
                        <>
                            <div className='switch-container'>
                                
                                <Switch
                                checked={lightMode}
                                onChange={toggleTheme}
                                className="theme"
                                />
                                <label htmlFor='theme-input' className="material-symbols-outlined">
                                    {!lightMode ? "dark_mode" : "light_mode"}
                                </label>
                            </div>
                            <div className='switch-container'>
                                
                                <Switch
                                    checked={translate}
                                    onChange={toggleTranslate}
                                    className="language"
                                />
                                <label htmlFor='language-input' className="material-symbols-outlined">
                                    language
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <SidebarSection icon={!lightMode ? "dark_mode" : "light_mode"} label='' action={toggleTheme}/>
                            <SidebarSection icon={'language'} label='' action={toggleTranslate}/>
                        </>
                    )
                }


                <h2 className="sidebar-title">
                    <Translate >
                        Navegación
                    </Translate>
                </h2>
        
                <ul className="sidebar-list">
                    <SidebarSection icon="home" label="Inicio" action={() => handleSectionsClick ('home')} />
                    <SidebarSection icon="grade" label="Destacados" action={() => handleSectionsClick ('feature')} />
                    <SidebarSection icon="search" label="Buscar producto" action={() => handleSectionsClick ('search')} />
                    <SidebarSection icon="shopping_cart" label="Carrito" action={() => handleSectionsClick ('cart')} />
        
                    <hr className="sidebar-divider" />
        
                    <SidebarSection icon="groups" label="Acerca de nosotros" action={() => handleSectionsClick ('about')} />
                </ul>
            </div>
            <hr className="sidebar-divider" />
            <div className="sidebar-footer">
                <p>
                    <Translate >
                        Hecho por Rogelio Andres Diaz Rosales
                    </Translate>
                </p>
                <p>Frontend Portfolio 2025</p>
            </div>
        </aside>
        
    );
}


