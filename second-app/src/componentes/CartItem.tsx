import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="cart-item-controls">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="quantity-btn"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="quantity-btn"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="remove-btn"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;