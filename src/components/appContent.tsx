import { useEffect, useState } from "react";
import { Page } from "../types";
import SignupPage from "../pages/auth/SignUp";
import LoginPage from "../pages/auth/LoginPage";
import PatientListPage from "../pages/PatientList";
import PatientDetailPage from "../pages/PatientDetails";
import AddPatientPage from "../pages/AddPatient";

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>("login");
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
        null
    );

    const handleNavigate = (page: Page, patientId?: number) => {
        if (patientId) setSelectedPatientId(patientId);
        setCurrentPage(page);
    };

    useEffect(() => {
        const sessionUser = localStorage.getItem("pdm_session");
        if (sessionUser) {
            setCurrentPage("list");
        }
    }, []);

    switch (currentPage) {
        case "signup":
            return <SignupPage onNavigate={handleNavigate} />;
        case "login":
            return <LoginPage onNavigate={handleNavigate} />;
        case "list":
            return <PatientListPage onNavigate={handleNavigate} />;
        case "detail":
            return (
                <PatientDetailPage
                    patientId={selectedPatientId}
                    onNavigate={handleNavigate}
                />
            );
        case "add":
            return <AddPatientPage onNavigate={handleNavigate} />;
        default:
            return <LoginPage onNavigate={handleNavigate} />;
    }
};

export default AppContent;
