import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const sessionUser = localStorage.getItem("pdm_session");
        if (sessionUser) {
            setIsAuthenticated(true);
            setCurrentUser(sessionUser);
        }
    }, []);

    const login = (username: string) => {
        localStorage.setItem("pdm_session", username);
        setIsAuthenticated(true);
        setCurrentUser(username);
    };

    const logout = () => {
        localStorage.removeItem("pdm_session");
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, currentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
