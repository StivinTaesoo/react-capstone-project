import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import LoadingIndicator from "../../components/LoadingIndicator";

const PatientDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const pid = id ? Number(id) : null;
    const { find, update, remove } = usePatients();
    const [patient, setPatient] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (pid) {
            const p = find(pid);
            setPatient(p);
        }
    }, [pid, find]);

    if (!patient) return <div className="content">Patient not found</div>;

    const handleDelete = async () => {
        if (!confirm("Delete patient?")) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 400));
        remove(patient.id);
        setLoading(false);
        navigate("/patients");
    };

    const handleSaveNote = async () => {
        const newNotes = patient.medicalRecord || [];
        await new Promise((r) => setTimeout(r, 300));
        update(patient.id, { medicalRecord: newNotes });
        alert("Saved");
    };

    return (
        <div className="content">
            <h2>{patient.name}</h2>
            {loading && <LoadingIndicator />}
            <div className="form-container">
                <div className="form-group">
                    <label>Contact</label>
                    <input
                        value={patient.contactInfo}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                contactInfo: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Medical Records (one per line)</label>
                    <textarea
                        rows={6}
                        value={(patient.medicalRecord || []).join("\n")}
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                medicalRecord: e.target.value
                                    .split("\n")
                                    .filter((r: string) => r.trim()),
                            })
                        }
                    />
                </div>

                <div className="form-group format-aria">
                    <label>Appointments</label>
                    <ul>
                        {(patient.appointments || []).map((a: any) => (
                            <li key={a.id}>
                                {new Date(a.dateISO).toLocaleString()} —{" "}
                                {a.notes}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-group format-aria">
                    <label>Diagnoses</label>
                    <ul>
                        {(patient.diagnoses || []).map(
                            (d: string, i: number) => (
                                <li key={i}>{d}</li>
                            )
                        )}
                    </ul>
                </div>

                <div className="form-group format-aria">
                    <label>Prescriptions</label>
                    <ul>
                        {(patient.prescriptions || []).map((pr: any) => (
                            <li key={pr.id}>
                                {pr.drugName} - {pr.dosage} - Adherence:{" "}
                                {pr.adherence ?? "N/A"}%
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="button-group">
                    <Link to={`/patients/${patient.id}/edit`}>
                        <button className="btn-primary">Edit</button>
                    </Link>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate("/patients")}
                    >
                        Cancel
                    </button>
                    <button className="btn-danger" onClick={handleDelete}>
                        Delete Patient
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailPage;
