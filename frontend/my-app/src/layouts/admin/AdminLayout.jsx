import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LoginPage } from "../../LoginPage";
import { list } from "../../Menu";

export default function AdminLayout() {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem("isAdmin") === "true";
    const location = useLocation();

    useEffect(() => {
        console.log("AdminLayout mounted");
        
        const handleStorageChange = () => {
          setIsLoggedIn(sessionStorage.getItem("isAdmin") === "true");
        };
        
        window.addEventListener("storage", handleStorageChange);
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    if (!isLoggedIn) {
        return (
            <LoginPage />
            );
    }

    return (
        <div className="AdminLayout">
            <div className="d-flex flex-column min-vh-100">
                <header className="bg-dark text-white py-3">
                    <div className="container d-flex justify-content-between align-items-center flex-wrap">
                        <h1 className="h3 mb-0">📱 Használt Telefon Webshop</h1>
                        <h5 className="mb-0">Adminisztrátori felület</h5>
                            <div className="d-flex flex-wrap align-items-center gap-2 menu">
                                <Link to="/" className={`btn btn-outline-light mt-2 ${location.pathname === '/' ? 'active' : ''}`}>Főoldal</Link>
                                {list.find(e => e.root === "/admin").routes.filter(e => e.show === true).map(page => (
                                <Link key={page.path} to={'/admin/' + page.path} className={`btn btn-outline-light mt-2 ${location.pathname === '/admin/' + page.path ? 'active' : ''}`}>
                                {page.name}
                                </Link>
                                ))}
                                <Link to="/" onClick={handleLogout} className="btn btn-danger mt-2">Kijelentkezés</Link>
                            </div>
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