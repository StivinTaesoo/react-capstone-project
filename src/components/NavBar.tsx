import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const NavBar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { currentUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="nav">
            <div className="nav-inner">
                <div className="brand" onClick={() => navigate("/")}>
                    PDM
                </div>
                <button
                    className="hamburger"
                    onClick={() => setOpen((s) => !s)}
                    aria-expanded={open}
                >
                    ☰
                </button>
                <div className={`nav-links ${open ? "open" : ""}`}>
                    <Link to="/patients" className="nav-link">
                        Patients
                    </Link>
                    <Link to="/staff" className="nav-link">
                        Staff
                    </Link>
                    <Link to="/drugs" className="nav-link">
                        Drugs
                    </Link>
                </div>
                <div className="nav-right">
                    {isAuthenticated ? (
                        <>
                            <span className="user-info">Hi, {currentUser}</span>
                            <button
                                className="btn-secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-secondary">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <style>{`
        .nav { background:white; padding:12px 16px; border-radius:10px; margin-bottom:16px; }
        .nav-inner{ display:flex; gap:12px; align-items:center; justify-content:space-between; }
        .brand{ font-weight:700; cursor:pointer; color:#333; }
        .hamburger{ display:none; background:none; border:none; font-size:20px; }
        .nav-links{ display:flex; gap:8px; align-items:center; }
        .nav-link{ padding:6px 10px; text-decoration:none; color:#333; border-radius:8px; }
        .nav-link:hover{ background:#f1f1ff; }
        .nav-right{ display:flex; gap:8px; align-items:center; }
        .btn-secondary{ background:white; border:1px solid #667eea; color:#667eea; padding:8px 10px; border-radius:6px; cursor:pointer; text-decoration:none; }
        @media (max-width:720px){
          .hamburger{ display:block; }
          .nav-links{ position:absolute; left:10px; right:10px; top:64px; background:white; padding:10px; border-radius:8px; display:none; flex-direction:column; gap:6px; z-index:100; }
          .nav-links.open{ display:flex; }
        }
      `}</style>
        </nav>
    );
};

export default NavBar;
