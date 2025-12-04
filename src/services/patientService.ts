import { Patient } from "../types";

const KEY = "pdm_patients_v2";

export const getPatients = (): Patient[] => {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]") as Patient[];
    } catch {
        return [];
    }
};

export const setPatients = (ps: Patient[]) => {
    localStorage.setItem(KEY, JSON.stringify(ps));
};

export const addPatient = (p: Patient) => {
    const list = getPatients();
    list.push(p);
    setPatients(list);
};

export const updatePatient = (id: number, patch: Partial<Patient>) => {
    const list = getPatients();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...patch };
    setPatients(list);
    return true;
};

export const deletePatient = (id: number) => {
    const list = getPatients().filter((x) => x.id !== id);
    setPatients(list);
};

export const findPatient = (id: number) => {
    return getPatients().find((p) => p.id === id) || null;
};
