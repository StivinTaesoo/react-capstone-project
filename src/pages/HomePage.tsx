import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="content">
            <h2>Welcome to Patient Data Manager</h2>
            <p>
                A demo SPA that simulates patient, staff and drug management
                (frontend only).
            </p>

            <div className="grid-cards" style={{ marginTop: 16 }}>
                <Link to="/patients" className="card">
                    <h3>Patients</h3>
                    <p>View, search, add & edit patients.</p>
                </Link>
                <Link to="/staff" className="card">
                    <h3>Staff</h3>
                    <p>Manage staff profiles and roles.</p>
                </Link>
                <Link to="/drugs" className="card">
                    <h3>Drugs</h3>
                    <p>Search inventory and manage stock.</p>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
