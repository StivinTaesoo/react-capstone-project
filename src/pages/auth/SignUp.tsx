import { useState } from "react";
import { Page, User } from "../../types";
import "./auth.css";

const SignupPage: React.FC<{ onNavigate: (page: Page) => void }> = ({
    onNavigate,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = () => {
        setError("");

        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        const users: User[] = JSON.parse(
            localStorage.getItem("pdm_users") || "[]"
        );

        if (users.some((u) => u.username === username)) {
            setError("Username already exists");
            return;
        }

        const newUser: User = {
            username,
            passwordHash: btoa(password),
        };

        users.push(newUser);
        localStorage.setItem("pdm_users", JSON.stringify(users));
        onNavigate("login");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Sign Up</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        onKeyPress={(e) => e.key === "Enter" && handleSignup()}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        onKeyPress={(e) => e.key === "Enter" && handleSignup()}
                    />
                </div>
                <button onClick={handleSignup} className="btn-primary">
                    Sign Up
                </button>
                <p className="auth-link">
                    Already have an account?{" "}
                    <span className="link" onClick={() => onNavigate("login")}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
