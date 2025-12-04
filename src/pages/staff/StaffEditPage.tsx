import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStaff } from "../../hooks/useStaff";

const StaffEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const sid = id === "new" ? null : id ? Number(id) : null;
    const { find, add, update } = useStaff();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (sid) {
            const s = find(sid);
            if (s) {
                setName(s.name);
                setRole(s.role);
                setContactInfo(s.contactInfo || "");
            }
        }
    }, [sid, find]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!name.trim()) {
            alert("Name required");
            return;
        }
        if (sid) {
            update(sid, {
                name: name.trim(),
                role: role.trim(),
                contactInfo: contactInfo.trim(),
            });
        } else {
            add({
                id: Date.now(),
                name: name.trim(),
                role: role.trim(),
                contactInfo: contactInfo.trim(),
            });
        }
        navigate("/staff");
    };

    return (
        <div className="content">
            <h2>{sid ? "Edit Staff" : "Add Staff"}</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <input
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                    />
                </div>
                <div className="button-group">
                    <button className="btn-primary" type="submit">
                        Save
                    </button>
                    <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => navigate("/staff")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StaffEditPage;
