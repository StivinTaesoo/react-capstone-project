import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="content">
            <div className="hero-section">
                <h2>Welcome to Speckledot Clinic Dashboard</h2>
                <p>Manage Patient data, drugs and staff database</p>
            </div>

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
