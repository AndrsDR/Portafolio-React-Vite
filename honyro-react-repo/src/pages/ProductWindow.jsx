import { useParams } from 'react-router-dom';
import products from '../mocks/products.json';
import { Sidebar } from '../components/Sidebar';
import './ProductWindow.css';
import { Translate } from '../components/Translate';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useState } from 'react';
import { CartSidebar } from '../components/CartSidebar.jsx';
import { Header } from '../components/Header.jsx';
import { SearchWindow } from '../components/SearchWindow.jsx';
import { Footer } from '../components/Footer.jsx';

export function ProductWindow() {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    if (!product) return <p>Producto no encontrado</p>;
    const { addToCart } = useContext(CartContext);
    const [ quantity, setQuantity ] = useState(1);


    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));



    return (
        <>
        <Sidebar />
        <Header/>
        <SearchWindow products={products} />
        <div className="product-window">
            <main className="product-detail">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-detail-info">
                    <h1>
                        <Translate>
                        {product.title}
                        </Translate>
                    </h1>
                    <p className="product-detail-description">
                        <Translate>
                            {product.description}
                        </Translate>
                    </p>
                    <div className="quantity-selector">
                        <label htmlFor="quantity">Cantidad:</label>
                        <div className="quantity-controls">
                            <button type="button" onClick={handleDecrease}>–</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={handleIncrease}>+</button>
                        </div>
                    </div>
                    <p className="product-detail-price">${product.price.toFixed(2)}</p>
                    <button className="product-detail-button" onClick={() => addToCart(product, quantity)}><Translate>Añadir al carrito</Translate></button>
                </div>
            </main>
        </div>
        <CartSidebar />
        <Footer />
        </>
    );
}

