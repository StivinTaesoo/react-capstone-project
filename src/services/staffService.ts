import { Staff } from "../types";
const KEY = "pdm_staff_v1";

export const getStaff = (): Staff[] => {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]") as Staff[];
    } catch {
        return [];
    }
};

export const setStaff = (s: Staff[]) =>
    localStorage.setItem(KEY, JSON.stringify(s));

export const addStaff = (s: Staff) => {
    const list = getStaff();
    list.push(s);
    setStaff(list);
};

export const updateStaff = (id: number, patch: Partial<Staff>) => {
    const list = getStaff();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...patch };
    setStaff(list);
    return true;
};

export const deleteStaff = (id: number) => {
    const list = getStaff().filter((x) => x.id !== id);
    setStaff(list);
};

export const findStaff = (id: number) =>
    getStaff().find((s) => s.id === id) || null;
