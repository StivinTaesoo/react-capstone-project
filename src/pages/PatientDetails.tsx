import { useEffect, useState } from "react";
import { Page, Patient } from "../types";

const PatientDetailPage: React.FC<{
    patientId: number | null;
    onNavigate: (page: Page) => void;
}> = ({ patientId, onNavigate }) => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [medicalRecord, setMedicalRecord] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        if (patientId) {
            const patients: Patient[] = JSON.parse(
                localStorage.getItem("pdm_patients") || "[]"
            );
            const foundPatient = patients.find((p) => p.id === patientId);

            if (foundPatient) {
                setPatient(foundPatient);
                setName(foundPatient.name);
                setAge(foundPatient.age.toString());
                setContactInfo(foundPatient.contactInfo);
                setMedicalRecord(foundPatient.medicalRecord.join("\n"));
            }
        }
    }, [patientId]);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Name is required");
            return;
        }

        const patients: Patient[] = JSON.parse(
            localStorage.getItem("pdm_patients") || "[]"
        );
        const index = patients.findIndex((p) => p.id === patientId);

        if (index !== -1) {
            patients[index] = {
                ...patients[index],
                name: name.trim(),
                age: Number(age) || 0,
                contactInfo: contactInfo.trim(),
                medicalRecord: medicalRecord
                    .split("\n")
                    .filter((r) => r.trim()),
            };

            localStorage.setItem("pdm_patients", JSON.stringify(patients));
            alert("Patient updated successfully!");
            onNavigate("list");
        }
    };

    const handleDelete = () => {
        const patients: Patient[] = JSON.parse(
            localStorage.getItem("pdm_patients") || "[]"
        );
        const filtered = patients.filter((p) => p.id !== patientId);
        localStorage.setItem("pdm_patients", JSON.stringify(filtered));
        onNavigate("list");
    };

    if (!patient) {
        return (
            <div className="app-container">
                <div className="content">Patient not found</div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Patient Details</h1>
                <button
                    onClick={() => onNavigate("list")}
                    className="btn-secondary"
                >
                    ← Back to List
                </button>
            </header>

            <div className="content">
                <div className="form-container">
                    <div className="form-group">
                        <label>Patient ID</label>
                        <input type="text" value={patient.id} disabled />
                    </div>

                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Info</label>
                        <input
                            type="text"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Medical Records (one per line)</label>
                        <textarea
                            rows={6}
                            value={medicalRecord}
                            onChange={(e) => setMedicalRecord(e.target.value)}
                        />
                    </div>

                    <div className="button-group">
                        <button onClick={handleSave} className="btn-primary">
                            Save Changes
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="btn-danger"
                        >
                            Delete Patient
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteConfirm && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowDeleteConfirm(false)}
                >
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Confirm Delete</h2>
                        <p>
                            Are you sure you want to delete this patient? This
                            action cannot be undone.
                        </p>
                        <div className="button-group">
                            <button
                                onClick={handleDelete}
                                className="btn-danger"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PatientDetailPage;
