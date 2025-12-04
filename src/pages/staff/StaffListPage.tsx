import { Link } from "react-router-dom";
import { useStaff } from "../../hooks/useStaff";

const StaffListPage: React.FC = () => {
    const { staff, remove } = useStaff();
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
                    onChange={() => {
                        /* add search if needed */
                    }}
                />
                <div>
                    <Link to="/staff/new" className="btn-primary">
                        Add Staff
                    </Link>
                </div>
            </div>

            <div className="patient-grid">
                {staff.map((s) => (
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
                            <Link to={`/staff/${s.id}/edit`} className="link">
                                Edit
                            </Link>{" "}
                            <button
                                className="link"
                                onClick={() => handleDelete(s.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffListPage;
