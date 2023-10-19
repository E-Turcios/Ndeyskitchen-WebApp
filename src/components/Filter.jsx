import React from 'react';

export default function Filter() {
  return (
    <div className="filter-container">
      <p className="filter-hedears">Types</p>
      <div className="filter-types items">
        <button>All</button>
        <button>Cakes</button>

        <button>Cupcakes</button>

        <button>Milshakes</button>
      </div>

      <p className="filter-hedears">Flavors</p>
      <div className="filter-types flavors">
        <button>Chocolat</button>

        <button>Vanilla</button>

        <button>Red velvet</button>
      </div>
    </div>
  );
}
