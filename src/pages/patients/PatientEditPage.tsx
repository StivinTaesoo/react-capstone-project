import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import "../styles/patientEdit.css";

const PatientEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const pid = id === "new" ? null : id ? Number(id) : null;
    const { find, add, update } = usePatients();
    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [contactInfo, setContactInfo] = useState("");
    const [medicalRecord, setMedicalRecord] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (pid) {
            const p = find(pid);
            if (p) {
                setName(p.name);
                setAge(p.age);
                setContactInfo(p.contactInfo);
                setMedicalRecord((p.medicalRecord || []).join("\n"));
            }
        }
    }, [pid, find]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!name.trim()) {
            alert("Name required");
            return;
        }
        if (pid) {
            update(pid, {
                name: name.trim(),
                age: Number(age) || 0,
                contactInfo: contactInfo.trim(),
                medicalRecord: medicalRecord
                    .split("\n")
                    .filter((r) => r.trim()),
            });
        } else {
            const newPatient = {
                id: Date.now(),
                name: name.trim(),
                age: Number(age) || 0,
                contactInfo: contactInfo.trim(),
                medicalRecord: medicalRecord
                    .split("\n")
                    .filter((r) => r.trim()),
                appointments: [],
                diagnoses: [],
                prescriptions: [],
            };
            add(newPatient);
        }
        navigate("/patients");
    };

    return (
        <div className="content">
            <h2>{pid ? "Edit Patient" : "Add Patient"}</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Name *</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age as any}
                        onChange={(e) =>
                            setAge(
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                            )
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Contact Info</label>
                    <input
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
                    <button className="btn-primary" type="submit">
                        Save
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/patients")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientEditPage;
