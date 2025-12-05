import { addPatient } from "../services/patientService";
import { addStaff } from "../services/staffService";
import { addDrug } from "../services/drugService";
import { Patient, Staff, Drug } from "../types";

export function runSeederIfNeeded() {
    const seededKey = "pdm_seeded_v1";
    if (localStorage.getItem(seededKey)) return;

    // create some sample drugs
    const drugs: Drug[] = [
        {
            id: 1,
            name: "Amoxicillin",
            description: "Antibiotic",
            manufacturer: "PharmaCo",
            stock: 120,
        },
        {
            id: 2,
            name: "Paracetamol",
            description: "Pain reliever",
            manufacturer: "HealInc",
            stock: 300,
        },
        {
            id: 3,
            name: "Metformin",
            description: "Diabetes med",
            manufacturer: "GenoPharm",
            stock: 80,
        },
    ];
    drugs.forEach(addDrug);

    // staff
    const staff: Staff[] = [
        {
            id: 1,
            name: "Dr. Amina Yusuf",
            role: "Doctor",
            contactInfo: "amina.y@example.com",
        },
        {
            id: 2,
            name: "Nurse Daniel",
            role: "Nurse",
            contactInfo: "daniel@example.com",
        },
    ];
    staff.forEach(addStaff);

    // patients
    const patients: Patient[] = [
        {
            id: 1,
            name: "Mark Daniels",
            age: 45,
            contactInfo: "daniels@example.com",
            medicalRecord: ["Annual checkup completed", "BP normal"],
            appointments: [
                {
                    id: 1,
                    dateISO: new Date(
                        Date.now() - 1000 * 60 * 60 * 24 * 90
                    ).toISOString(),
                    notes: "Annual check",
                },
                {
                    id: 2,
                    dateISO: new Date(
                        Date.now() + 1000 * 60 * 60 * 24 * 7
                    ).toISOString(),
                    notes: "Follow-up",
                },
            ],
            diagnoses: ["Hypertension"],
            prescriptions: [
                {
                    id: 1,
                    drugId: 2,
                    drugName: "Paracetamol",
                    dosage: "500mg",
                    frequency: "Twice a day",
                    duration: "5 days",
                    adherence: 100,
                },
            ],
        },
        {
            id: 2,
            name: "Adaeze Okoro",
            age: 30,
            contactInfo: "ada@example.com",
            medicalRecord: ["Allergy: Penicillin"],
            appointments: [],
            diagnoses: [],
            prescriptions: [],
        },
    ];
    patients.forEach(addPatient);

    localStorage.setItem(seededKey, "1");
}
