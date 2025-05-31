import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "./../admin/context/CategoryContext";
import axios from "axios";
import PriceFilter from "./components/PriceFilter";
import NameSearch from "./components/NameSearch";
import { useNavigate } from 'react-router-dom';
import './MainPage.css';


export default function MainPage() {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(CategoryContext);
  const [localCategories, setLocalCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  
  useEffect(() => {
    if (!categories || categories.length === 0) {
      axios.get('http://127.0.0.1:8080/read/categories')
        .then(res => {
          setCategories(res.data);
          setLocalCategories(res.data);
          setFilteredCategories(res.data);
        })
        .catch(error => {
          console.error("Hiba a kategóriák betöltésekor:", error);
        });
    } else {
      setLocalCategories(categories);
      setFilteredCategories(categories);
    }
  }, [categories, setCategories]);

    const handlePriceFilter = ({ min, max }) => {
    let filtered = localCategories;
    
    if (min !== null) {
      filtered = filtered.filter(cat => cat.price >= min);
    }
    
    if (max !== null) {
      filtered = filtered.filter(cat => cat.price <= max);
    }
    
    setFilteredCategories(filtered);
  };

  
  const handleNameSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredCategories(localCategories);
    } else {
      const filtered = localCategories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm)
      );
      setFilteredCategories(filtered);
    }
  };

 
  const addToCart = (category) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItem = cart.find(item => item.id === category.id);
    if (!existingItem) {
        cart.push(category);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Termék hozzáadva a kosárhoz!');
      } else {
        alert('Ez a termék már a kosárban van!');
      }
    };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <PriceFilter onPriceFilter={handlePriceFilter} />
          <NameSearch onNameSearch={handleNameSearch} />
        </div>
        <div className="col-md-6">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="col">
                <div className={`card h-100 ${selectedCategory?.id === category.id ? 'border-primary' : ''}`} style={{cursor: 'pointer'}} onClick={() => setSelectedCategory(category)}>
                        <img src={category.image} className="card-img-top" alt={category.name} style={{ height: '250px',  objectFit: 'cover' }}/>
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">
                      <span className="badge bg-primary">
                        {category.price.toLocaleString()} Ft
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3">
          {selectedCategory && (
            <div className="card">
              <div className="card-header">
                <h4>{selectedCategory.name}</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <img src={`${selectedCategory.image}`} className="img-fluid rounded mb-3" alt={selectedCategory.name}/>
                  </div>
                  <div className="col-12">
                    <h5>Részletek</h5>
                    <p><strong>Leírás:</strong> {selectedCategory.description}</p>
                    <p>
                      <strong>Állapot:</strong>{' '}
                      <span className={`badge ${
                        selectedCategory.condition === 'Újszerű' 
                          ? 'bg-success' 
                          : selectedCategory.condition === 'Viseltes' 
                            ? 'bg-warning' 
                            : 'bg-danger'
                      }`}>
                        {selectedCategory.condition}
                      </span>
                    </p>
                    <p>
                      <strong>Ár:</strong>{' '}
                      <span className="badge bg-primary fs-6">
                        {selectedCategory.price.toLocaleString()} Ft
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => addToCart(selectedCategory)}>Kosárba helyez</button>
          <button className="btn btn-info" onClick={() => navigate('/cart')}>Kosár megtekintése</button>
        </div>
      </div>
          )}
        </div>
      </div>
    </div>
  );
}