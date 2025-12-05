import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDrugs } from "../../hooks/useDrugs";
import "../styles/patientEdit.css";

const DrugEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const did = id === "new" ? null : id ? Number(id) : null;
    const { find, add, update } = useDrugs();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [stock, setStock] = useState<number | "">("");
    const navigate = useNavigate();

    useEffect(() => {
        if (did) {
            const d = find(did);
            if (d) {
                setName(d.name);
                setDescription(d.description || "");
                setManufacturer(d.manufacturer || "");
                setStock(d.stock ?? "");
            }
        }
    }, [did, find]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!name.trim()) {
            alert("Name required");
            return;
        }
        if (did) {
            update(did, {
                name: name.trim(),
                description,
                manufacturer,
                stock: Number(stock) || 0,
            });
        } else {
            add({
                id: Date.now(),
                name: name.trim(),
                description,
                manufacturer,
                stock: Number(stock) || 0,
            });
        }
        navigate("/drugs");
    };

    return (
        <div className="content">
            <h2>{did ? "Edit Drug" : "Add Drug"}</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Manufacturer</label>
                    <input
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock as any}
                        onChange={(e) =>
                            setStock(
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                            )
                        }
                    />
                </div>
                <div className="button-group">
                    <button className="btn-primary" type="submit">
                        Save
                    </button>
                    <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => navigate("/drugs")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DrugEditPage;
