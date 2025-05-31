import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"

export function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === "admin1234") {
      sessionStorage.setItem("isAdmin", "true")
      navigate("/admin/inventory-manage")
    } else {
      setError("Helytelen jelszó.")
    }
  }

    const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };


  return (
    <div className="LoginPage">
      <div className="login-box md-3 shadow-lg rounded-md mt-5 display-flex">
      <h2>Admin Bejelentkezés</h2>
      <form onSubmit={handleLogin}>
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Belépés</button>
      </form>
      </div>  
      {error && <h2 className="error">{error}</h2>}
    </div>
  )
}
