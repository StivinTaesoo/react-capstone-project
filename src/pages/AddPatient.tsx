import { useState } from "react";
import { Page, Patient } from "../types";

const AddPatientPage: React.FC<{ onNavigate: (page: Page) => void }> = ({
    onNavigate,
}) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [medicalRecord, setMedicalRecord] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            alert("Name is required");
            return;
        }

        const patients: Patient[] = JSON.parse(
            localStorage.getItem("pdm_patients") || "[]"
        );

        const newPatient: Patient = {
            id: Date.now(),
            name: name.trim(),
            age: Number(age) || 0,
            contactInfo: contactInfo.trim(),
            medicalRecord: medicalRecord.split("\n").filter((r) => r.trim()),
        };

        patients.push(newPatient);
        localStorage.setItem("pdm_patients", JSON.stringify(patients));

        onNavigate("list");
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Add New Patient</h1>
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
                        <label>Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter patient name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter age"
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Info</label>
                        <input
                            type="text"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            placeholder="Email or phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Medical Records (one per line)</label>
                        <textarea
                            rows={6}
                            value={medicalRecord}
                            onChange={(e) => setMedicalRecord(e.target.value)}
                            placeholder="Enter medical records, one per line"
                        />
                    </div>

                    <div className="button-group">
                        <button onClick={handleSubmit} className="btn-primary">
                            Add Patient
                        </button>
                        <button
                            onClick={() => onNavigate("list")}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddPatientPage;
