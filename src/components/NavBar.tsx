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
        setOpen(false); // close menu on mobile
        navigate("/login");
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        setOpen(false); // close mobile menu
    };

    return (
        <nav className="nav">
            <div className="nav-inner">
                <div className="brand" onClick={() => handleNavigate("/")}>
                    ::SDC::
                </div>

                {/* Hamburger Button */}
                <button
                    className="hamburger"
                    onClick={() => setOpen(true)}
                    aria-expanded={open}
                >
                    ☰
                </button>

                {/* Desktop Navigation */}
                <div className="nav-links desktop-only">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
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

                <div className="nav-right desktop-only">
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
                        <Link to="/login" className="btn-secondary">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* **********  MOBILE MENU ************/}
            <div className={`mobile-menu ${open ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setOpen(false)}>
                    ×
                </button>

                <Link
                    to="/"
                    className="mobile-link"
                    onClick={() => setOpen(false)}
                >
                    Home
                </Link>

                <Link
                    to="/patients"
                    className="mobile-link"
                    onClick={() => setOpen(false)}
                >
                    Patients
                </Link>

                <Link
                    to="/staff"
                    className="mobile-link"
                    onClick={() => setOpen(false)}
                >
                    Staff
                </Link>

                <Link
                    to="/drugs"
                    className="mobile-link"
                    onClick={() => setOpen(false)}
                >
                    Drugs
                </Link>

                <div className="mobile-auth">
                    {isAuthenticated ? (
                        <>
                            <div className="mobile-user">Hi, {currentUser}</div>
                            <button
                                className="btn-secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn-secondary"
                            onClick={() => handleNavigate("/login")}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
