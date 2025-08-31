
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProductWindowProvider } from './context/ProductWindowContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { CartSidebarProvider } from './context/CartSidebarContext.jsx';
import { SearchWindowProvider } from './context/SearchWindowContext.jsx';

createRoot(document.getElementById('root')).render(
  <>
  <SearchWindowProvider>
    <BrowserRouter>
      <CartSidebarProvider>
        <CartProvider>
          <ProductWindowProvider>
            <ThemeProvider>
              <LanguageProvider>
                <App />
              </LanguageProvider>
            </ThemeProvider>
          </ProductWindowProvider>
        </CartProvider>
      </CartSidebarProvider>
    </BrowserRouter>
  </SearchWindowProvider>
  </>,
)
