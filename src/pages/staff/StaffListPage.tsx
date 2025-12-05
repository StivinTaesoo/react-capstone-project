import { Link } from "react-router-dom";
import { useStaff } from "../../hooks/useStaff";
import { useState } from "react";
import "../styles/patientList.css";

const StaffListPage: React.FC = () => {
    const { staff, remove } = useStaff();
    const [search, setSearch] = useState("");

    const filtered = staff.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toString().includes(search)
    );
    const handleDelete = (id: number) => {
        if (!confirm("Delete staff?")) return;
        remove(id);
    };

    return (
        <div className="content">
            <div className="toolbar">
                <input
                    className="search-input"
                    placeholder="Search staff..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <Link to="/staff/new" className="btn-primary">
                        Add Staff
                    </Link>
                </div>
            </div>

            <div className="patient-grid">
                {filtered.length === 0 ? (
                    <div className="empty-state">No patients found</div>
                ) : (
                    filtered.map((s) => (
                        <div key={s.id} className="patient-card">
                            <h3>{s.name}</h3>
                            <p>
                                <strong>Role:</strong> {s.role}
                            </p>
                            <p>
                                <strong>Contact:</strong> {s.contactInfo}
                            </p>
                            <div className="card-footer">
                                <Link to={`/staff/${s.id}`} className="link">
                                    View
                                </Link>{" "}
                                <Link
                                    to={`/staff/${s.id}/edit`}
                                    className="link"
                                >
                                    Edit
                                </Link>{" "}
                                <button
                                    className="link delete-btn"
                                    onClick={() => handleDelete(s.id)}
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

export default StaffListPage;
