import React from "react";

interface Props {
    name: string;
    age: number | "";
    contactInfo: string;
    medicalRecord: string;
    setName: (v: string) => void;
    setAge: (v: number | "") => void;
    setContactInfo: (v: string) => void;
    setMedicalRecord: (v: string) => void;
}

const PatientInfoForm: React.FC<Props> = ({
    name,
    age,
    contactInfo,
    medicalRecord,
    setName,
    setAge,
    setContactInfo,
    setMedicalRecord,
}) => {
    return (
        <>
            <div className="form-group">
                <label>Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Age</label>
                <input
                    type="number"
                    value={age as any}
                    onChange={(e) =>
                        setAge(
                            e.target.value === "" ? "" : Number(e.target.value)
                        )
                    }
                />
            </div>

            <div className="form-group">
                <label>Contact Info</label>
                <input
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Medical Records (one per line)</label>
                <textarea
                    rows={6}
                    value={medicalRecord}
                    onChange={(e) => setMedicalRecord(e.target.value)}
                />
            </div>
        </>
    );
};

export default PatientInfoForm;
