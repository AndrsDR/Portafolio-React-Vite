
import { Sidebar } from '../components/sidebar'
import { InfiniteCarousel } from '../components/InfiniteCarousel.jsx'; 
import { CarouselWithArrows } from '../components/CarouselWithArrows.jsx';
import { ProductCard } from '../components/ProductCard.jsx'; 
import products from '../mocks/products.json';
import { Translate } from '../components/Translate.jsx';
import { Header } from '../components/Header.jsx';
import { CartSidebar } from '../components/CartSidebar.jsx';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ScrollAnimation from '../components/ScrollAnimation.jsx';
import { SearchWindow } from '../components/SearchWindow.jsx';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';


export function HomePage() {
    const categories = [...new Set(products.map(product => product.category))];
    const { addToCart } = useContext(CartContext);

    const navigate = useNavigate();

    const getFeaturedProducts = (products) => {
        const sortedProducts = products.sort((a,b) => b.price - a.price);

        return sortedProducts.slice(0, 3);
    }

    const featuredProducts = getFeaturedProducts(products);


    return (
        <>
            <Header />
            <Sidebar />
            <CartSidebar />
            <SearchWindow products={products} />
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title"><Translate>Bienvenido a mi sitio</Translate></h1>
                    <p className="hero-subtitle"><Translate>Explora nuestros productos y encuentra lo que necesitas</Translate></p>
                </div>
            </section>
            <h2 className='section-title'><Translate>Explora nuestros productos</Translate></h2>
            <section id='products'>
                <InfiniteCarousel>
                    {
                        products.map(product => (
                            <div className='item'>
                            <ProductCard
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                onAddToCart={() => addToCart(product)}
                            />
                            </div>
                        ))
                    }
                </InfiniteCarousel>
            </section>
            <h2 className='section-title'><Translate>Categorias principales</Translate></h2>
            <section className={'category-product-section'}>
                {
                    categories.map(category => {
                        const filteredProducts = products.filter(product => product.category === category);
            
                        const adjustedProducts = !(filteredProducts.length % 2 === 0)
                            ? filteredProducts
                            : filteredProducts.slice(0, -1); 
            
                        return (
                            <div key={category} className="category-section">
                                <h2>
                                    <Translate>
                                        {category}
                                    </Translate>
                                </h2>
                                <CarouselWithArrows>
                                    {
                                        adjustedProducts.map(product => (
                                            <ProductCard
                                                key={product.id}
                                                id={product.id}
                                                image={product.image}
                                                title={product.title}
                                                description={product.description}
                                                price={product.price}
                                                onAddToCart={() => addToCart(product)}
                                            />
                                        ))
                                    }
                                </CarouselWithArrows>
                            </div>
                        )
                    })
                }
            </section>
            <section id='about' className="about-section">
                <div className="about-container">
                    <div className="about-text">
                        <h2><Translate>About us</Translate></h2>
                        <p><Translate>En</Translate> <strong>MiSitio</strong><Translate>, creemos en la combinación de diseño, tecnología y experiencia para crear soluciones digitales que realmente importan. Nuestro equipo está enfocado en ofrecer productos accesibles, modernos y pensados para el usuario final. </Translate> </p>
                        <ul className="about-highlights">
                            <li>✔️ <Translate>Compromiso con la accesibilidad </Translate></li>
                            <li>✔️ <Translate>Diseño centrado en el usuario</Translate></li>
                            <li>✔️ <Translate>Innovación constante</Translate></li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <img alt="Nuestro equipo trabajando" src="/team.png"/>
                    </div>
                </div>
            </section>
            <section id='featured' className="featured-products-section" aria-labelledby="featured-heading">
                <h2 id="featured-heading" className="section-title">
                    <Translate>Productos destacados</Translate>
                </h2>
            
                <ul className="featured-list" role="list">
                    {featuredProducts.map((product) => (
                        <ScrollAnimation>
                            <li key={product.id} className="featured-item">
                                <article className="featured-card">
                                    <div className="featured-media">
                                        <img
                                            className="featured-img"
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                
                                    <div className="featured-body">
                                        <h3 className="featured-title"><Translate>{product.title}</Translate></h3>
                                        <p className="featured-desc"><Translate>{product.description}</Translate></p>
                
                                        <div className="featured-meta">
                                            <span className="featured-price">${product.price}</span>
                                            <div className="featured-actions">
                                                <button
                                                    className="details-button"
                                                    onClick={() => navigate(`/product/${product.id}`)}
                                                >
                                                    <Translate>View details</Translate>
                                                </button>
                                                <button
                                                    className="product-button"
                                                    onClick={() => addToCart(product)}
                                                >
                                                    <Translate>Añadir al carrito</Translate>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ScrollAnimation>
                    ))}
                </ul>
            </section>
            <Footer />

        </>
    )
}
