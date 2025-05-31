import { useState } from "react";


export default function NewItemForm({ onClose, onSave }) {
    const [category, setCategory] = useState({ id: '', name: '', description: '', condition: '', price: '', image: '' });


    const handleSubmit = (e) => { e.preventDefault();
       if (onSave) {
            onSave(category); 
            setCategory({ id: '', name: '', description: '', condition: '', price: '', image: '' });
            if (onClose) {
                onClose(); 
            }
        } else {
             if (onClose) {
                onClose();
            }
        }
    };

  return (
    <div className="NewItemForm container my-5">
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h2 className="h5 mb-0">Új telefon felvétele</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
  
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Telefon azonosító:
              <input type="number" id="categoryId" name="id" className="form-control" placeholder="Írd ide a telefon azonosítóját" value={category.id} onChange={(e) => setCategory({ ...category, id: e.target.value })} required autoComplete="off"/>
            </label>
          </div>
  
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">Telefon név:
              <input type="text" id="categoryName" name="name" className="form-control" placeholder="Írd ide a telefon nevét" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} required autoComplete="off"/>
            </label>
          </div>
  
          <div className="mb-3">
            <label htmlFor="categoryDescription" className="form-label">Telefon leírás:
              <input type="text" id="categoryDescription" name="description" className="form-control" placeholder="Adj egy rövid leírást" value={category.description} onChange={(e) => setCategory({ ...category, description: e.target.value })} required autoComplete="off"/>
            </label>
          </div>
  
          <div className="mb-3">
            <label htmlFor="categoryCondition" className="form-label">Telefon állapot:
              <select id="categoryCondition" className="form-select" value={category.condition} onChange={(e) => setCategory({ ...category, condition: e.target.value })} required>
                <option value="">Válassz állapotot</option>
                <option value="Újszerű">Újszerű</option>
                <option value="Viseltes">Viseltes</option>
                <option value="Rossz">Rossz</option>
              </select>
            </label>
          </div>
  
          <div className="mb-3">
            <label htmlFor="categoryPrice" className="form-label">Telefon ár:
              <input type="number" id="categoryPrice" name="price" className="form-control" placeholder="Telefon ára" value={category.price} onChange={(e) => setCategory({ ...category, price: e.target.value })} required autoComplete="off" />
            </label>
          </div>

          <div className="mb-3">
              <label htmlFor="categoryImage" className="form-label">Kép URL:
                <input type="text" id="categoryImage" name="image" className="form-control" placeholder="Add meg a kép URL-jét" value={category.image} onChange={(e) => setCategory({ ...category, image: e.target.value })} autoComplete="off"/>
              </label>
          </div>

            {category.image && (
              <div className="mb-3">
                <label className="form-label">Kép előnézet:</label>
                <img src={category.image}  alt="Előnézet"  className="img-fluid rounded"  style={{maxHeight: '200px'}} onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="alert alert-warning" style={{display: 'none'}}>
                  Nem sikerült betölteni a képet
                </div>
              </div>
            )}
  
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">Mentés</button>
            <button className="btn btn-secondary ms-2" type="button" onClick={onClose}>Mégse</button>
          </div>
  
        </form>
      </div>
    </div>
  </div>
  
);
}
