import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; 

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setRemovingItem(itemToRemove.id);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h3 className="h5 mb-0">Kosár tartalma</h3>
                <button className="btn btn-outline-light btn-sm" onClick={clearCart} disabled={cartItems.length === 0}>Kosár ürítése</button>
              </div>

              <div className="card-body p-0">
                {cartItems.length === 0 ? (
                  <div className="cart-empty-state">
                    <p className="text-muted"> 🛒 A kosár üres 🛒 </p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush">
                    {cartItems.map((item) => (
                      <div  key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3 cart-product-list-item">
                        <div className="d-flex align-items-center">
                          <img  src={item.image}  alt={item.name} className="cart-product-image me-3"/>
                          <div>
                            <h5 className="mb-1">{item.name}</h5>
                            <p className="mb-0 text-muted">
                              {item.price.toLocaleString()} Ft
                            </p>
                          </div>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>Eltávolítás</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card-footer bg-white">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <p className="h5 text-primary">Végösszeg: {calculateTotal().toLocaleString()} Ft</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <div className="btn-group" role="group">
                      <button className="btn btn-outline-success" onClick={() => navigate('/')}>Vásárlás folytatása</button>
                      <button className="btn btn-primary" disabled={cartItems.length === 0}>Megrendelés</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}