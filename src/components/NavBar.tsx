import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "./styles/sections.css";

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
                    PDMS
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
        </nav>
    );
};

export default NavBar;
