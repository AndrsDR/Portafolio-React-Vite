import './SearchWindow.css';
import { Translate } from './Translate.jsx';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { SearchWindowContext } from '../context/SearchWindowContext.jsx';
import { useFiltersLog } from '../hooks/filtersLog.js';
import { useNavigate } from 'react-router-dom';


export function SearchWindow({ products = []}) {

    const {isSearchWindowOpen, setIsSearchWindowOpen} = useContext(SearchWindowContext);

    const categories = [...new Set(products.map(product => product.category))];

    const navigate = useNavigate();

    // Estado UI (aún sin lógica de filtrado; tú la añadirás con tu hook)
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);
    const { addToCart } = useContext(CartContext);

    const searchedProducts = useFiltersLog({ query, category, priceMin, priceMax },500, products);

    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (!isSearchWindowOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [isSearchWindowOpen]);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
        setIsSearchWindowOpen(false)
    }

    return (
        <>
            {isSearchWindowOpen && (
                <div className="search-overlay" onClick={() => setIsSearchWindowOpen(false)}>
                    <div className="search-window" onClick={(e) => e.stopPropagation()}>
                        <header className="search-header">
                            <h2><Translate>Buscar productos</Translate></h2>
                            <button
                                className="close-btn"
                                onClick={() => setIsSearchWindowOpen(false)}
                                aria-label="Cerrar"
                                type="button"
                            >
                                ×
                            </button>
                        </header>

                        {/* Controles (solo UI) */}
                        <div className="search-controls" role="search">
                            <label className="input">
                                <span className="visually-hidden"><Translate>Buscar</Translate></span>
                                <input
                                    type="search"
                                    placeholder="Buscar por nombre o descripción…"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    inputMode="search"
                                    autoComplete="off"
                                />
                            </label>

                            <label className="select">
                                <span className="visually-hidden"><Translate>Categoría</Translate></span>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="all"><Translate>Todas</Translate></option>
                                    {categories.map((c) => (
                                        <option value={c}><Translate>{c}</Translate></option>
                                    ))}
                                </select>
                            </label>

                            <fieldset className="price-range" role="group" aria-labelledby="price-range-label">
                                <legend id="price-range-label" className="visually-hidden">
                                    
                                    <Translate>
                                        Rango de precio
                                    </Translate>
                                    </legend>
                            
                                {/* Inputs numéricos para precisión */}
                                <div className="price-range__inputs">
                                    <label>
                                        <span className="visually-hidden">
                                            <Translate>
                                            Precio mínimo
                                            </Translate>
                                            </span>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min={0}
                                            max={priceMax}
                                            step={10}
                                            value={priceMin}
                                            onChange={(e) => {
                                                const v = Math.max(0, Math.min(Number(e.target.value || 0), priceMax));
                                                setPriceMin(v);
                                            }}
                                            aria-label="Precio mínimo"
                                        />
                                    </label>
                                    <span aria-hidden="true">–</span>
                                    <label>
                                        <span className="visually-hidden">
                                            
                                            <Translate>Precio máximo</Translate></span>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min={priceMin}
                                            max={1000}
                                            step={10}
                                            value={priceMax}
                                            onChange={(e) => {
                                                const v = Math.min(1000, Math.max(Number(e.target.value || 0), priceMin));
                                                setPriceMax(v);
                                            }}
                                            aria-label="Precio máximo"
                                        />
                                    </label>
                                </div>
                            
                                {/* Slider doble sobre una sola pista SIN crear componente */}
                                <div
                                    className="price-range__slider"
                                    style={{
                                        "--min": `${((priceMin - 0) / (1000 - 0)) * 100}%`,
                                        "--max": `${((priceMax - 0) / (1000 - 0)) * 100}%`,
                                    }}
                                >
                                    <div className="price-range__track" aria-hidden="true"></div>
                                    <div className="price-range__fill" aria-hidden="true"></div>
                            
                                    <input
                                        type="range"
                                        className="price-range__thumb price-range__thumb--min"
                                        min={0}
                                        max={1000}
                                        step={10}
                                        value={priceMin}
                                        onChange={(e) => {
                                            const v = Math.min(Number(e.target.value), priceMax);
                                            setPriceMin(v);
                                        }}
                                        aria-label="Precio mínimo"
                                        aria-valuemin={0}
                                        aria-valuemax={priceMax}
                                        aria-valuenow={priceMin}
                                        aria-valuetext={`$${priceMin}`}
                                    />
                                    <input
                                        type="range"
                                        className="price-range__thumb price-range__thumb--max"
                                        min={0}
                                        max={1000}
                                        step={10}
                                        value={priceMax}
                                        onChange={(e) => {
                                            const v = Math.max(Number(e.target.value), priceMin);
                                            setPriceMax(v);
                                        }}
                                        aria-label="Precio máximo"
                                        aria-valuemin={priceMin}
                                        aria-valuemax={1000}
                                        aria-valuenow={priceMax}
                                        aria-valuetext={`$${priceMax}`}
                                    />
                                </div>
                            
                                <div className="price-range__labels" aria-live="polite">
                                    <span>${priceMin}</span>
                                    <span>${priceMax}</span>
                                </div>
                            </fieldset>
                            
                        </div>

                        {/* Resultados: solo mapeo visual; sin filtros aplicados por ahora */}
                        <div className="search-results">
                            {searchedProducts.map((p) => (
                                <div key={p.id} className="search-card">
                                    <img onClick={() => handleClick(p.id)} src={p.image} alt={p.title} className="search-card__img" />
                                    <div className="search-card__body">
                                        <h3 onClick={() => handleClick(p.id)} className="search-card__title">{p.TranslatedTitle}</h3>
                                        <p onClick={() => handleClick(p.id)} className="search-card__desc"><Translate>{p.description}</Translate></p>
                                        <div className='search-card__footer'>
                                            <span className="search-card__price">$<Translate>{p.price}</Translate></span>
                                            <button 
                                                className="product-button"
                                                onClick={() => addToCart(p)}
                                            >
                                                <Translate>Añadir al carrito</Translate>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

