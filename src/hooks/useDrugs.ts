import { useState, useEffect, useCallback } from "react";
import * as drugService from "../services/drugService";
import { Drug } from "../types";

export function useDrugs() {
    const [drugs, setDrugs] = useState<Drug[]>(() => drugService.getDrugs());
    const reload = useCallback(() => setDrugs(drugService.getDrugs()), []);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key && e.key.startsWith("pdm_")) reload();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [reload]);

    const add = (d: Drug) => {
        drugService.addDrug(d);
        reload();
    };
    const update = (id: number, patch: Partial<Drug>) => {
        const ok = drugService.updateDrug(id, patch);
        reload();
        return ok;
    };
    const remove = (id: number) => {
        drugService.deleteDrug(id);
        reload();
    };

    return { drugs, reload, add, update, remove, find: drugService.findDrug };
}
