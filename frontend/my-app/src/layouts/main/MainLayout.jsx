import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { list } from "../../Menu";

export default function MainLayout() {
  return (
    <div className="MainLayout">
      <div className="d-flex flex-column min-vh-100">
        <header className="bg-dark text-white py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">📱 Használt Telefon Webshop</h1>
            <nav>
               {list.find(e => e.root === "").routes.filter(e => e.show === true).map(page => (
                    <Link key={page.path} to={'' + page.path} className={`btn btn-outline-light mt-2 ${location.pathname === '' + page.path ? 'active' : ''}`}> {page.name}
                    </Link>
                ))}
                <Link to="/admin/inventory-manage" className={`btn btn-outline-light mt-2 ${location.pathname === '/admin/inventory-manage' ? 'active' : ''}`}>Admin</Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow-1">
          <Outlet /> 
        </main>
        
        <footer className="bg-dark text-center py-3 mt-auto border-top text-light">
          <div className="container">
            <p className="mb-0">© 2025 Webshop – Minden jog fenntartva.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}