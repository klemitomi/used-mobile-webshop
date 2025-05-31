import axios from "axios";
import { useState, useEffect } from "react";
import { CategoryContext } from "./context/CategoryContext";
import MenuCategory from "./components/MenuCategory";
import NewItemForm from "./components/NewItemForm";

export default function InventoryManage() {
  const [categories, setCategories] = useState([]);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  

  const saveNewCategory = (newCategoryData) => {
    const newCategories = [...categories, newCategoryData];
    axios.post('http://127.0.0.1:8080/save/categories', { data: newCategories })
      .then(res => {
      setCategories(res.data);
    });
  }
  const fetchCategories = () => {
    axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Hiba a készlet feldolgozásban:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      <div className="InventoryManage">  
            <MenuCategory />
        </div>

    </CategoryContext.Provider>
  );
}