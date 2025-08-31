
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { Translate } from './Translate.jsx';


export function ProductCard({ 
    image, 
    title, 
    description, 
    price, 
    onAddToCart,
    id
}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${id}`);
    }



    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={title} loading="lazy" />
            </div>
            <div className="product-info">
                <h3 className="product-title" onClick={handleClick}>
                    <Translate>
                        {title}
                    </Translate>
                </h3>
                <p className="product-description">
                    <Translate>
                        {description}
                    </Translate></p>
                <div className="product-footer">
                    <span className="product-price">${price.toFixed(2)}</span>
                    <button 
                        className="product-button"
                        onClick={onAddToCart}
                    >
                        <Translate>Añadir al carrito</Translate>
                    </button>
                </div>
            </div>
        </div>
    );
}
