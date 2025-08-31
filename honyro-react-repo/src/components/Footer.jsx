import "./Footer.css"
import { useSectionsActions } from '../hooks/sectionsActions.js';
import { Translate } from './Translate.jsx';
export function Footer() {
    const { handleSectionsClick } = useSectionsActions();

    return (
        <>
        <footer className="site-footer">
            <div className="footer-container">
                {/* Columna 1: Logo + descripción */}
                <div className="footer-brand">
                    <h2 className="footer-logo">MiSitio</h2>
                    <p className="footer-desc">
                        <Translate>Productos hechos con pasión y accesibilidad en mente.</Translate>
                    </p>
                </div>

                {/* Columna 2: Navegación */}
                <nav className="footer-nav" aria-label="Enlaces del pie de página">
                    <ul>
                        <li onClick={() => handleSectionsClick('about')}><Translate>About Us</Translate></li>
                        <li onClick={() => handleSectionsClick('feature')}><Translate>Productos</Translate></li>
                    </ul>
                </nav>

                {/* Columna 3: Contacto/Redes */}
                <div className="footer-contact">
                    <a target="_blank" href="https://mail.google.com/mail/?view=cm&to=andres.diaz.r.dev@gmail.com">andres.diaz.r.dev@gmail.com </a>
                    <div className="footer-social">
                        <a target="_blank" href="https://github.com/AndrsDR" aria-label="GitHub">💻 Git Hub</a>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MiSitio. <Translate>Todos los derechos reservados</Translate>. </p>
            </div>
        </footer>
        </>
    )
}