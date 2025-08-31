// components/CartSidebar.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartSidebarContext } from "../context/CartSidebarContext";
import "./CartSidebar.css";
export function CartSidebar() {
    const { cart, addToCart, removeFromCart, decrementFromCart, clearCart } = useContext(CartContext);
    const { cartIsOpen, setCartIsOpen } = useContext(CartSidebarContext);

    return (
        <>
            {cartIsOpen && (
                <>
                    {/* Backdrop para cerrar al hacer click fuera */}
                    <div
                        className="cart-backdrop"
                        onClick={() => setCartIsOpen(false)}
                        aria-hidden="true"
                    />

                    <aside
                        className="cart-sidebar"
                        role="dialog"
                        aria-labelledby="cart-title"
                        aria-modal="true"
                    >
                        <header className="cart-sidebar__header">
                            <h2 id="cart-title" className="cart-sidebar__title">
                                Carrito
                            </h2>

                            <button
                                onClick={() => setCartIsOpen(false)}
                                className="close-button"
                                aria-label="Cerrar carrito"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </header>

                        {/* Contenido (puedes mapear items aquí más adelante) */}
                        <div className="cart-sidebar__content">
                            {cart.length === 0 ? (
                                <p className="cart-empty">Tu carrito está vacío</p>
                            ) : (
                                <ul className="cart-list">
                                    {cart.map((item) => (
                                        <li className="cart-item" key={item.id}>
                                            <img className="cart-item__thumb" src={item.image} alt={item.title} />
                                            <div className="cart-item__info">
                                                <h3 className="cart-item__title">{item.title}</h3>
                                                <div className="cart-item__controls">
                                                    <button onClick={() => decrementFromCart(item)} className="qty-btn">-</button>
                                                    <span className="qty">{item.quantity}</span>
                                                    <button onClick={() => addToCart(item)} className="qty-btn">+</button>
                                                    <button onClick={() => removeFromCart(item)} className="qty-btn"><span className="material-symbols-outlined">delete</span></button>
                                                </div>
                                            </div>
                                            <div className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <footer className="cart-sidebar__footer">
                            <div className="cart-total">
                                <span>Total</span>
                                <strong>
                                    $
                                    {cart.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}
                                </strong>
                            </div>
                            <div className="cart-actions">
                                <button className="cart-btn ghost" onClick={clearCart}>Vaciar</button>
                                <button className="cart-btn primary">Comprar</button>
                            </div>
                        </footer>
                    </aside>
                </>
            )}
        </>
    );
}

