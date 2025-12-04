import { useState } from "react";
import { Link } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import LoadingIndicator from "../../components/LoadingIndicator";

const PatientListPage: React.FC = () => {
    const { patients, remove } = usePatients();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const filtered = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toString().includes(search)
    );

    const handleDelete = async (id: number) => {
        if (!confirm("Delete patient?")) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 400));
        remove(id);
        setLoading(false);
    };

    return (
        <div className="content">
            <div className="toolbar">
                <input
                    className="search-input"
                    placeholder="Search by name or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <Link to="/patients/new" className="btn-primary">
                        Add New Patient
                    </Link>
                </div>
            </div>

            {loading && <LoadingIndicator />}

            <div className="patient-grid">
                {filtered.length === 0 ? (
                    <div className="empty-state">No patients found</div>
                ) : (
                    filtered.map((p) => (
                        <div key={p.id} className="patient-card">
                            <div className="patient-id">ID: {p.id}</div>
                            <h3>{p.name}</h3>
                            <p>
                                <strong>Age:</strong> {p.age}
                            </p>
                            <p>
                                <strong>Contact:</strong> {p.contactInfo}
                            </p>
                            <div className="card-footer">
                                <Link to={`/patients/${p.id}`} className="link">
                                    View
                                </Link>{" "}
                                <Link
                                    to={`/patients/${p.id}/edit`}
                                    className="link"
                                >
                                    Edit
                                </Link>{" "}
                                <button
                                    className="link"
                                    onClick={() => handleDelete(p.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PatientListPage;
