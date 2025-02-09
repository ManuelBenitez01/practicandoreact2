import React, { useState } from 'react';
import { ShoppingCart, Fish, X } from 'lucide-react';
import { products } from './data/products';
import CartItem from './componentes/CartItem';
import ProductCard from './componentes/ProductCard';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div>
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="brand">
              <Fish className="h-8 w-8" />
              <h1>Pescadería del Mar</h1>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-button"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>{totalItems}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">
        {categories.map((category) => (
          <section key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="products-grid">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
            </div>
          </section>
        ))}
      </main>

      <div className={`cart-overlay ${!isCartOpen ? 'hidden' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Carrito de Compra</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="cart-close-btn"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">El carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => alert('¡Gracias por tu compra!')}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;