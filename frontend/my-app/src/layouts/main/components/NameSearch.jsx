import React, { useState } from 'react';
import './NameSearch.css'; 
export default function NameSearch({ onNameSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onNameSearch(searchTerm.toLowerCase());
  };

  const handleReset = () => {
    setSearchTerm('');
    onNameSearch('');
  };

  return (
    <div className="NameSearch card mb-3">
      <div className="card-header">Keresés névben</div>
      <div className="card-body">
        <div className="input-group">
          <input type="text" className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Telefon neve"/>
          <button className="btn btn-primary" onClick={handleSearch}>Keresés</button>
          <button className="btn btn-secondary" onClick={handleReset}>Törlés</button>
        </div>
      </div>
    </div>
  );
}