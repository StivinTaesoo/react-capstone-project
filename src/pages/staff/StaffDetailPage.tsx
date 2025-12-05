import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useStaff } from "../../hooks/useStaff";

const StaffDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const sid = id ? Number(id) : null;
    const { find, update, remove } = useStaff();
    const [staff, setStaff] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (sid) setStaff(find(sid));
    }, [sid, find]);

    if (!staff) return <div className="content">Staff not found</div>;

    const handleDelete = () => {
        if (!confirm("Delete staff?")) return;
        remove(staff.id);
        navigate("/staff");
    };

    return (
        <div className="content">
            <h2>{staff.name}</h2>
            <p>
                <strong>Role:</strong> {staff.role}
            </p>
            <p>
                <strong>Contact:</strong> {staff.contactInfo}
            </p>

            <div className="button-group">
                <Link to={`/staff/${staff.id}/edit`} className="btn-primary">
                    Edit
                </Link>
                <button
                    className="btn-secondary"
                    onClick={() => navigate("/staff")}
                >
                    Back
                </button>
                <button className="btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default StaffDetailPage;
