import { addPatient } from "../services/patientService";
import { addStaff } from "../services/staffService";
import { addDrug } from "../services/drugService";
import { Patient, Staff, Drug } from "../types";

/* ********************----------------------------
   FETCH HELPERS (APIs)
-------------------------------******************** */

// Unique ID generator
function uniqueNum() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// 1. Fetch drugs from OpenFDA
async function fetchDrugs(): Promise<Drug[]> {
    try {
        const res = await fetch("https://api.fda.gov/drug/label.json?limit=20");
        if (!res.ok) throw new Error("Drug API error");

        const data = await res.json();

        return data.results.map((d: any, index: number) => ({
            id: uniqueNum(),
            name: d.openfda?.brand_name?.[0] || "Unknown Drug",
            description: d.indications_and_usage?.[0] || "No description",
            manufacturer: d.openfda?.manufacturer_name?.[0] || "Unknown",
            stock: Math.floor(Math.random() * 200 + 20),
        }));
    } catch (err) {
        console.error("Drug fetch failed, using fallback:", err);

        // fallback samples
        return [
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
    }
}

// 2. Fetch patients from RandomUser
async function fetchPatients(): Promise<Patient[]> {
    try {
        const res = await fetch("https://randomuser.me/api/?results=10");
        if (!res.ok) throw new Error("Patient API error");

        const data = await res.json();

        return data.results.map((u: any, index: number) => ({
            id: uniqueNum(),
            name: `${u.name.first} ${u.name.last}`,
            age: u.dob.age,
            contactInfo: u.email,
            medicalRecord: [],
            appointments: [],
            diagnoses: [],
            prescriptions: [],
        }));
    } catch (err) {
        console.error("Patient fetch failed, using fallback:", err);

        return [
            {
                id: 1,
                name: "Mark Daniels",
                age: 45,
                contactInfo: "daniels@example.com",
                medicalRecord: ["Annual checkup completed", "BP normal"],
                appointments: [],
                diagnoses: ["Hypertension"],
                prescriptions: [],
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
    }
}

// 3. Fetch staff from JSONPlaceholder
async function fetchStaff(): Promise<Staff[]> {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Staff API error");

        const data = await res.json();

        return data.slice(0, 5).map((u: any, index: number) => ({
            id: uniqueNum(),
            name: u.name,
            role: index % 2 === 0 ? "Doctor" : "Nurse",
            contactInfo: u.email,
        }));
    } catch (err) {
        console.error("Staff fetch failed, using fallback:", err);

        return [
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
    }
}

/* ********************----------------------------
   MAIN SEEDER
-----------------------------********************* */

export async function runSeederIfNeeded() {
    const seededKey = "pdm_seeded_v2";
    if (localStorage.getItem(seededKey)) return;

    try {
        // Fetch everything concurrently
        const [patients, staff, drugs] = await Promise.all([
            fetchPatients(),
            fetchStaff(),
            fetchDrugs(),
        ]);

        // Save results to localStorage via your service methods
        patients.forEach(addPatient);
        staff.forEach(addStaff);
        drugs.forEach(addDrug);

        // Mark as seeded
        localStorage.setItem(seededKey, "1");
        console.log("Seeder completed successfully.");
    } catch (err) {
        console.error("Seeder failed:", err);
    }
}
