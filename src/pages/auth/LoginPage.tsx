import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { hashPassword } from "../../utils/crypto";

const KEY_USERS = "pdm_users_v2";
const KEY_SESSION = "pdm_session";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Fill in all fields");
            return;
        }
        setLoading(true);
        try {
            const hashed = await hashPassword(password);
            const users = JSON.parse(localStorage.getItem(KEY_USERS) || "[]");
            const user = users.find(
                (u: any) => u.username === username && u.passwordHash === hashed
            );
            if (!user) {
                setError("Invalid credentials");
                setLoading(false);
                return;
            }
            localStorage.setItem(
                KEY_SESSION,
                JSON.stringify({ username, loggedAt: Date.now() })
            );
            // navigate to home (protected area)
            navigate("/");
        } catch (err) {
            setError("Login failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="auth-link">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
