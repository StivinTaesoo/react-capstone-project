import { useState } from "react";
import { Page, Patient, User } from "../../types";
import { useAuth } from "../../context/authContext";
import "./auth.css";

const LoginPage: React.FC<{ onNavigate: (page: Page) => void }> = ({
    onNavigate,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const fetchInitialPatients = async () => {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            const users = await response.json();

            const patients: Patient[] = users.map((user: any) => ({
                id: user.id,
                name: user.name,
                age: Math.floor(Math.random() * 50) + 20,
                contactInfo: user.email,
                medicalRecord: [
                    "Annual checkup completed",
                    "Blood pressure: Normal",
                ],
            }));

            localStorage.setItem("pdm_patients", JSON.stringify(patients));
        } catch (err) {
            console.error("Failed to fetch initial patients:", err);
        }
    };

    const handleLogin = async () => {
        setError("");

        const users: User[] = JSON.parse(
            localStorage.getItem("pdm_users") || "[]"
        );
        const user = users.find(
            (u) => u.username === username && u.passwordHash === btoa(password)
        );

        if (!user) {
            setError("Invalid username or password");
            return;
        }

        const hasPatients = localStorage.getItem("pdm_patients");
        if (!hasPatients) {
            await fetchInitialPatients();
        }

        login(username);
        onNavigate("list");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>
                <button onClick={handleLogin} className="btn-primary">
                    Login
                </button>
                <p className="auth-link">
                    Don't have an account?{" "}
                    <span className="link" onClick={() => onNavigate("signup")}>
                        Sign up here
                    </span>
                </p>
            </div>
        </div>
    );
};
