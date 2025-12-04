import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
    return (
        <div className="app-container">
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
