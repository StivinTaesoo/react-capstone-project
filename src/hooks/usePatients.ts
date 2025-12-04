import { useState, useEffect, useCallback } from "react";
import * as patientService from "../services/patientService";
import { Patient } from "../types";

export function usePatients() {
    const [patients, setPatients] = useState<Patient[]>(() =>
        patientService.getPatients()
    );

    const reload = useCallback(
        () => setPatients(patientService.getPatients()),
        []
    );

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key && e.key.startsWith("pdm_")) reload();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [reload]);

    const add = (p: Patient) => {
        patientService.addPatient(p);
        reload();
    };
    const update = (id: number, patch: Partial<Patient>) => {
        const ok = patientService.updatePatient(id, patch);
        reload();
        return ok;
    };
    const remove = (id: number) => {
        patientService.deletePatient(id);
        reload();
    };

    return {
        patients,
        reload,
        add,
        update,
        remove,
        find: patientService.findPatient,
    };
}
