import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { AuthContextType } from "../types";

const KEY = "pdm_session";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const c = useContext(AuthContext);
    if (!c) throw new Error("useAuth must be used within AuthProvider");
    return c;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const s = localStorage.getItem(KEY);

        if (s) {
            try {
                const parsed = JSON.parse(s);
                setCurrentUser(parsed.username);
                setIsAuthenticated(true);
            } catch {
                setCurrentUser(s);
                setIsAuthenticated(true);
            }
        }

        setInitializing(false);
    }, []);

    const login = (username: string) => {
        const payload = { username, loggedAt: Date.now() };
        localStorage.setItem(KEY, JSON.stringify(payload));
        setCurrentUser(username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(KEY);
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                currentUser,
                initializing,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
