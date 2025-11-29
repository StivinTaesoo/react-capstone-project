// Types
interface Patient {
    id: number;
    name: string;
    age: number;
    contactInfo: string;
    medicalRecord: string[];
}

interface User {
    username: string;
    passwordHash: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string) => void;
    logout: () => void;
    currentUser: string | null;
}

type Page = "login" | "signup" | "list" | "detail" | "add";
