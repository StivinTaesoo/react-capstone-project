import { useState, useEffect, useCallback } from "react";
import * as staffService from "../services/staffService";
import { Staff } from "../types";

export function useStaff() {
    const [staff, setStaff] = useState<Staff[]>(() => staffService.getStaff());
    const reload = useCallback(() => setStaff(staffService.getStaff()), []);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key && e.key.startsWith("pdm_")) reload();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [reload]);

    const add = (s: Staff) => {
        staffService.addStaff(s);
        reload();
    };
    const update = (id: number, patch: Partial<Staff>) => {
        const ok = staffService.updateStaff(id, patch);
        reload();
        return ok;
    };
    const remove = (id: number) => {
        staffService.deleteStaff(id);
        reload();
    };

    return { staff, reload, add, update, remove, find: staffService.findStaff };
}
