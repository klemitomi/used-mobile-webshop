import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CategoryProvider } from './layouts/admin/context/CategoryContext';
import { list } from './Menu';
import './App.css';

export default function App() {
  return (
    <CategoryProvider>
      <BrowserRouter>
        <Routes>
          {list.map((layout, index) => (
            <Route key={index} path={layout.root} element={layout.layout}>
              {layout.routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path === '' ? layout.root : `${layout.root}/${route.path}`}
                  element={route.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </CategoryProvider>
  );
}