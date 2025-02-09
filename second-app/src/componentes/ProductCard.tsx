import React from 'react';
import { ShoppingCart } from 'lucide-react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">
            ${product.price.toFixed(2)}/kg
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="add-to-cart-btn"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;