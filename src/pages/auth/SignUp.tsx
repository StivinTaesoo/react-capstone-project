import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "../../utils/crypto";

const KEY_USERS = "pdm_users_v2";

const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const users = JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
            if (users.some((u: any) => u.username === username)) {
                setError("Username already exists");
                setLoading(false);
                return;
            }
            const passwordHash = await hashPassword(password);
            users.push({ username, passwordHash });
            localStorage.setItem(KEY_USERS, JSON.stringify(users));
            // auto login + redirect
            localStorage.setItem(
                "pdm_session",
                JSON.stringify({ username, loggedAt: Date.now() })
            );
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Failed to sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Sign Up</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="su-username">Username</label>
                        <input
                            id="su-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="su-password">Password</label>
                        <input
                            id="su-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Choose a password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
