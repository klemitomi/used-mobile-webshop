import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { CategoryContext } from "./../context/CategoryContext";
import { useNavigate } from "react-router-dom";
import NewItemForm from "./NewItemForm";
import './MenuCategory.css';

export default function MenuCategory() {
  const navigate = useNavigate();  
  const { categories, setCategories } = useContext(CategoryContext);
  const [localCategories, setLocalCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showNewItemForm, setShowNewItemForm] = useState(false);

  useEffect(() => {
    setLocalCategories(categories || []);
  }, [categories]);

 
  function saveNewCategory(newCategoryData) {
    const newCategories = [...localCategories, newCategoryData];
    axios.post('http://127.0.0.1:8080/save/categories', { data: newCategories}).then(res => {
        setCategories(res.data);
        setShowNewItemForm(false);
      });
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };


  const updateCategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = localCategories.map(cat => cat.id === selectedCategory.id ? selectedCategory : cat);

    axios.post('http://127.0.0.1:8080/save/categories', { data: updatedCategories }).then(res => {
        setCategories(res.data);
        setSelectedCategory(null);
      });
  };


  const deleteCategory = (categoryToDelete) => {
    const newCategories = localCategories.filter(cat => cat.id !== categoryToDelete.id);
    
    axios.post('http://127.0.0.1:8080/save/categories', { data: newCategories }).then(res => {
        setCategories(res.data);
        setSelectedCategory(null);
      });
  };

  return (
    <div className="container-fluid">
      <h1>Jelenlegi készlet</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4>Telefonok listája</h4>
              <button  className="btn btn-success" onClick={() => setShowNewItemForm(true)}>Új felvétele</button>
            </div>
            
            {showNewItemForm && (
              <NewItemForm  onClose={() => setShowNewItemForm(false)} onSave={saveNewCategory} />
            )}

            <ul className="list-group list-group-flush">
              {localCategories.map((category) => (
                <li key={category.id} className={`list-group-item list-group-item-action ${selectedCategory?.id === category.id ? 'active' : ''}`} onClick={() => handleCategorySelect(category)}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="badge bg-primary">{category.name}</p>
                    <p className="badge bg-primary">{category.price.toLocaleString('hu-HU')} Ft</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          {selectedCategory && (
            <div className="card">
              <div className="card-header">
                <h4>Telefon adatlap</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Név
                      <input type="text" className="form-control" value={selectedCategory.name} onChange={(e) => setSelectedCategory({ ...selectedCategory,  name: e.target.value })} />
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Leírás
                      <textarea className="form-control" value={selectedCategory.description} onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })} />
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Állapot
                      <select className="form-select" value={selectedCategory.condition} onChange={(e) => setSelectedCategory({ ...selectedCategory, condition: e.target.value })} >
                        <option value="Újszerű">Újszerű</option>
                        <option value="Viseltes">Viseltes</option>
                        <option value="Rossz">Rossz</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ár
                      <input type="number" className="form-control" value={selectedCategory.price || ''} onChange={(e) => {
                          const newPrice = e.target.value === '' ? null : Number(e.target.value);
                          setSelectedCategory({...selectedCategory, price: newPrice
                          });
                        }} 
                      />
                    </label>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Kép URL
                      <input type="text" className="form-control" value={selectedCategory.image || ''}onChange={(e) => setSelectedCategory({...selectedCategory, image: e.target.value})} />
                    </label>
                  </div>
        
                    {selectedCategory.image && (
                      <div className="mb-3">
                        <label className="form-label">Kép előnézet:
                          <img src={selectedCategory.image} alt="Telefon kép" className="img-fluid rounded"  style={{maxHeight: '200px'}} onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'block'; }} />
                        </label>
                      <div className="alert alert-warning" style={{display: 'none'}}> Nem sikerült betölteni a képet</div>
                  </div>
                )}
                
                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={updateCategory}>Mentés</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteCategory(selectedCategory)}>Törlés</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}