import React, { createContext, useState, useMemo } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const contextValue= useMemo(() => ({ categories, setCategories }), [categories]);
    return (
        <CategoryContext.Provider value={contextValue}>
            {children}
        </CategoryContext.Provider>
    );
};
