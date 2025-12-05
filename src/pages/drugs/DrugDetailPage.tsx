import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDrugs } from "../../hooks/useDrugs";

const DrugDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const did = id ? Number(id) : null;
    const { find, remove } = useDrugs();
    const [drug, setDrug] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (did) setDrug(find(did));
    }, [did, find]);

    if (!drug) return <div className="content">Drug not found</div>;

    const handleDelete = () => {
        if (!confirm("Delete drug?")) return;
        remove(drug.id);
        navigate("/drugs");
    };

    return (
        <div className="content">
            <h2>{drug.name}</h2>
            <p>{drug.description}</p>
            <p>
                <strong>Manufacturer:</strong> {drug.manufacturer}
            </p>
            <p>
                <strong>Stock:</strong> {drug.stock}
            </p>
            <div className="button-group">
                <Link to={`/drugs/${drug.id}/edit`} className="btn-primary">
                    Edit
                </Link>
                <button
                    className="btn-secondary"
                    onClick={() => navigate("/drugs")}
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

export default DrugDetailPage;
