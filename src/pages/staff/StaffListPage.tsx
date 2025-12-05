import { useState } from "react";
import { Link } from "react-router-dom";
import { useStaff } from "../../hooks/useStaff";
import PageToolbar from "../../components/PageToolbar";
import CardGrid from "../../components/CardGrid";

const StaffListPage: React.FC = () => {
    const { staff, remove } = useStaff();
    const [search, setSearch] = useState("");

    const filtered = staff.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toString().includes(search)
    );

    const handleDelete = (id: number) => {
        if (!confirm("Delete staff?")) return;
        remove(id);
    };

    return (
        <div className="content">
            <PageToolbar
                search={search}
                onSearch={setSearch}
                buttonText="Add Staff"
                buttonLink="/staff/new"
                placeholder="Search staff..."
            />

            <CardGrid items={filtered} emptyText="No staff found">
                {(s) => (
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
                                className="link delete-btn"
                                onClick={() => handleDelete(s.id)}
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

export default StaffListPage;
