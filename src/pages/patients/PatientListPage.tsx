import { useState } from "react";
import { Link } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";
import LoadingIndicator from "../../components/LoadingIndicator";
import PageToolbar from "../../components/PageToolbar";
import CardGrid from "../../components/CardGrid";

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
            <PageToolbar
                search={search}
                onSearch={setSearch}
                buttonText="Add New Patient"
                buttonLink="/patients/new"
                placeholder="Search by name or ID..."
            />

            {loading && <LoadingIndicator />}

            <CardGrid items={filtered} emptyText="No patients found">
                {(p) => (
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
                                className="link delete-btn"
                                onClick={() => handleDelete(p.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </CardGrid>
        </div>
    );
};

export default PatientListPage;
