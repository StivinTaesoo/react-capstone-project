import { useEffect, useState } from "react";
import { Page, Patient } from "../types";
import { useAuth } from "../context/authContext";

const PatientListPage: React.FC<{
    onNavigate: (page: Page, patientId?: number) => void;
}> = ({ onNavigate }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { logout, currentUser } = useAuth();

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = () => {
        const storedPatients = JSON.parse(
            localStorage.getItem("pdm_patients") || "[]"
        );
        setPatients(storedPatients);
    };

    const filteredPatients = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toString().includes(searchTerm)
    );

    const handleLogout = () => {
        logout();
        onNavigate("login");
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Patient Management System</h1>
                <div className="header-actions">
                    <span className="user-info">Welcome, {currentUser}</span>
                    <button onClick={handleLogout} className="btn-secondary">
                        Logout
                    </button>
                </div>
            </header>

            <div className="content">
                <div className="toolbar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => onNavigate("add")}
                        className="btn-primary"
                    >
                        Add New Patient
                    </button>
                </div>

                <div className="patient-grid">
                    {filteredPatients.length === 0 ? (
                        <div className="empty-state">No patients found</div>
                    ) : (
                        filteredPatients.map((patient) => (
                            <div
                                key={patient.id}
                                className="patient-card"
                                onClick={() => onNavigate("detail", patient.id)}
                            >
                                <div className="patient-id">
                                    ID: {patient.id}
                                </div>
                                <h3>{patient.name}</h3>
                                <p>
                                    <strong>Age:</strong> {patient.age}
                                </p>
                                <p>
                                    <strong>Contact:</strong>{" "}
                                    {patient.contactInfo}
                                </p>
                                <div className="card-footer">
                                    Click to view details →
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
