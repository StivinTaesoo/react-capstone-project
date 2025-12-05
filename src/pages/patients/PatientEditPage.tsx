import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatients } from "../../hooks/usePatients";

import PatientInfoForm from "../../components/patient/PatientInfoForm";
import AppointmentsEditor from "../../components/patient/AppointmentsEditor";
import DiagnosesEditor from "../../components/patient/DiagnosesEditor";
import PrescriptionEditor from "../../components/patient/PrescriptionEditor";

const PatientEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const pid = id === "new" ? null : id ? Number(id) : null;

    const { find, add, update } = usePatients();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [contactInfo, setContactInfo] = useState("");
    const [medicalRecord, setMedicalRecord] = useState("");

    const [appointments, setAppointments] = useState<any[]>([]);
    const [diagnoses, setDiagnoses] = useState<string[]>([]);
    const [prescriptions, setPrescriptions] = useState<any[]>([]);

    // Load patient if editing
    useEffect(() => {
        if (!pid) return;

        const p = find(pid);
        if (!p) return;

        setName(p.name);
        setAge(p.age);
        setContactInfo(p.contactInfo);
        setMedicalRecord((p.medicalRecord || []).join("\n"));

        setAppointments(p.appointments || []);
        setDiagnoses(p.diagnoses || []);
        setPrescriptions(p.prescriptions || []);
    }, [pid, find]);

    // Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return alert("Name required");

        const data = {
            name: name.trim(),
            age: Number(age) || 0,
            contactInfo: contactInfo.trim(),
            medicalRecord: medicalRecord.split("\n").filter((x) => x.trim()),
            appointments,
            diagnoses,
            prescriptions,
        };

        if (pid) update(pid, data);
        else add({ id: Date.now(), ...data });

        navigate("/patients");
    };

    return (
        <div className="content">
            <h2>{pid ? "Edit Patient" : "Add Patient"}</h2>

            <form onSubmit={handleSubmit} className="form-container">
                <PatientInfoForm
                    name={name}
                    age={age}
                    contactInfo={contactInfo}
                    medicalRecord={medicalRecord}
                    setName={setName}
                    setAge={setAge}
                    setContactInfo={setContactInfo}
                    setMedicalRecord={setMedicalRecord}
                />

                <AppointmentsEditor
                    appointments={appointments}
                    addAppointment={() =>
                        setAppointments([
                            ...appointments,
                            {
                                id: Date.now(),
                                dateISO: new Date().toISOString(),
                                notes: "",
                            },
                        ])
                    }
                    updateAppointment={(id, field, value) =>
                        setAppointments(
                            appointments.map((a) =>
                                a.id === id ? { ...a, [field]: value } : a
                            )
                        )
                    }
                    removeAppointment={(id) =>
                        setAppointments(appointments.filter((a) => a.id !== id))
                    }
                />

                <DiagnosesEditor
                    diagnoses={diagnoses}
                    addDiagnosis={() => setDiagnoses([...diagnoses, ""])}
                    updateDiagnosis={(i, v) =>
                        setDiagnoses(
                            diagnoses.map((d, idx) => (idx === i ? v : d))
                        )
                    }
                    removeDiagnosis={(i) =>
                        setDiagnoses(diagnoses.filter((_, idx) => idx !== i))
                    }
                />

                <PrescriptionEditor
                    prescriptions={prescriptions}
                    addPrescription={() =>
                        setPrescriptions([
                            ...prescriptions,
                            {
                                id: Date.now(),
                                drugName: "",
                                dosage: "",
                                adherence: null,
                            },
                        ])
                    }
                    updatePrescription={(id, f, v) =>
                        setPrescriptions(
                            prescriptions.map((p) =>
                                p.id === id ? { ...p, [f]: v } : p
                            )
                        )
                    }
                    removePrescription={(id) =>
                        setPrescriptions(
                            prescriptions.filter((p) => p.id !== id)
                        )
                    }
                />

                <div className="button-group">
                    <button className="btn-primary" type="submit">
                        Save
                    </button>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/patients")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientEditPage;
