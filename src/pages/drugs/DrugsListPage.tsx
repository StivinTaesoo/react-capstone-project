import { useState } from "react";
import { Link } from "react-router-dom";
import { useDrugs } from "../../hooks/useDrugs";
import PageToolbar from "../../components/PageToolbar";
import CardGrid from "../../components/CardGrid";

const DrugsListPage: React.FC = () => {
    const { drugs, remove } = useDrugs();
    const [search, setSearch] = useState("");

    const filtered = drugs.filter(
        (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.id.toString().includes(search)
    );

    const handleDelete = (id: number) => {
        if (!confirm("Delete drug?")) return;
        remove(id);
    };

    return (
        <div className="content">
            <PageToolbar
                search={search}
                onSearch={setSearch}
                buttonText="Add Drug"
                buttonLink="/drugs/new"
                placeholder="Search drugs..."
            />

            <CardGrid items={filtered} emptyText="No drugs found">
                {(d) => (
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
                                className="link delete-btn"
                                onClick={() => handleDelete(d.id)}
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

export default DrugsListPage;
