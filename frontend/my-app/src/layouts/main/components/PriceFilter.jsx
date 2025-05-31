import React, { useState } from 'react';

export default function PriceFilter({ onPriceFilter }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onPriceFilter({
      min: minPrice === '' ? null : Number(minPrice),
      max: maxPrice === '' ? null : Number(maxPrice)
    });
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    onPriceFilter({ min: null, max: null });
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Ár szerinti szűrés</div>
      <div className="card-body">
        <div className="row g-2">
          <div className="col-md-6">
            <label className="form-label">Min. ár
              <input type="number" className="form-control" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Minimum ár"/>
            </label>
          </div>
          <div className="col-md-6">
            <label className="form-label">Max. ár
              <input type="number" className="form-control" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Maximum ár"/>
            </label>
          </div>
          <div className="col-12 d-flex gap-2 mt-2">
            <button className="btn btn-primary"  onClick={handleFilter}>Szűrés</button>
            <button className="btn btn-secondary" onClick={handleReset}>Visszaállítás</button>
          </div>
        </div>
      </div>
    </div>
  );
}