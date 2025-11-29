export interface Patient {
    id: number;
    name: string;
    age: number;
    contactInfo: string;
    medicalRecord: string[];
}

export interface User {
    username: string;
    passwordHash: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string) => void;
    logout: () => void;
    currentUser: string | null;
}

export type Page = "login" | "signup" | "list" | "detail" | "add";
