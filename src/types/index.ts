export interface Appointment {
    id: number;
    dateISO: string;
    notes?: string;
    outcome?: string;
}

export interface Prescription {
    id: number;
    drugId: number;
    drugName: string;
    dosage: string;
    frequency: string;
    duration: string;
    adherence?: number;
}

export interface Patient {
    id: number;
    name: string;
    age: number;
    contactInfo: string;
    medicalRecord: string[];
    appointments: Appointment[];
    diagnoses: string[];
    prescriptions: Prescription[];
}

export interface Staff {
    id: number;
    name: string;
    role: string;
    contactInfo?: string;
    username?: string;
    passwordHash?: string;
}

export interface Drug {
    id: number;
    name: string;
    description?: string;
    manufacturer?: string;
    stock?: number;
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

export type Page =
    | "home"
    | "login"
    | "signup"
    | "patients"
    | "patientDetail"
    | "addPatient"
    | "staff"
    | "staffDetail"
    | "drugs"
    | "drugDetail";
