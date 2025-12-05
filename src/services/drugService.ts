import { Drug } from "../types";
const KEY = "pdm_drugs_v1";

export const getDrugs = (): Drug[] => {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]") as Drug[];
    } catch {
        return [];
    }
};

export const setDrugs = (d: Drug[]) =>
    localStorage.setItem(KEY, JSON.stringify(d));

export const addDrug = (d: Drug) => {
    const list = getDrugs();
    list.push(d);
    setDrugs(list);
};

export const updateDrug = (id: number, patch: Partial<Drug>) => {
    const list = getDrugs();
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) return false;
    list[idx] = { ...list[idx], ...patch };
    setDrugs(list);
    return true;
};

export const deleteDrug = (id: number) => {
    const list = getDrugs().filter((x) => x.id !== id);
    setDrugs(list);
};

export const findDrug = (id: number) =>
    getDrugs().find((d) => d.id === id) || null;
