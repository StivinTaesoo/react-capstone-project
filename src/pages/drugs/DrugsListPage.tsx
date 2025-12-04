import { Link } from "react-router-dom";
import { useDrugs } from "../../hooks/useDrugs";

const DrugsListPage: React.FC = () => {
    const { drugs, remove } = useDrugs();

    const handleDelete = (id: number) => {
        if (!confirm("Delete drug?")) return;
        remove(id);
    };

    return (
        <div className="content">
            <div className="toolbar">
                <input
                    className="search-input"
                    placeholder="Search drugs..."
                    onChange={() => {
                        /* add search later */
                    }}
                />
                <div>
                    <Link to="/drugs/new" className="btn-primary">
                        Add Drug
                    </Link>
                </div>
            </div>

            <div className="patient-grid">
                {drugs.map((d) => (
                    <div key={d.id} className="patient-card">
                        <h3>{d.name}</h3>
                        <p>{d.manufacturer}</p>
                        <p>
                            <strong>Stock:</strong> {d.stock ?? "N/A"}
                        </p>
                        <div className="card-footer">
                            <Link to={`/drugs/${d.id}`} className="link">
                                View
                            </Link>{" "}
                            <Link to={`/drugs/${d.id}/edit`} className="link">
                                Edit
                            </Link>{" "}
                            <button
                                className="link"
                                onClick={() => handleDelete(d.id)}
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

export default DrugsListPage;
