import React from "react";

interface Prescription {
    id: number;
    drugName: string;
    dosage: string;
    adherence: number | null;
}

interface Props {
    prescriptions: Prescription[];
    addPrescription: () => void;
    updatePrescription: (id: number, field: string, value: any) => void;
    removePrescription: (id: number) => void;
}

const PrescriptionsEditor: React.FC<Props> = ({
    prescriptions,
    addPrescription,
    updatePrescription,
    removePrescription,
}) => {
    return (
        <div className="form-group">
            <label>Prescriptions</label>

            {prescriptions.map((p) => (
                <div key={p.id} className="sub-section">
                    <div>
                        <label>Drug Name</label>
                        <input
                            value={p.drugName}
                            onChange={(e) =>
                                updatePrescription(
                                    p.id,
                                    "drugName",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Dosage</label>
                        <input
                            value={p.dosage}
                            onChange={(e) =>
                                updatePrescription(
                                    p.id,
                                    "dosage",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Adherence (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={p.adherence ?? ""}
                            onChange={(e) =>
                                updatePrescription(
                                    p.id,
                                    "adherence",
                                    e.target.value === ""
                                        ? null
                                        : Number(e.target.value)
                                )
                            }
                        />
                    </div>

                    <button
                        type="button"
                        className="btn-danger"
                        onClick={() => removePrescription(p.id)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="btn-secondary"
                onClick={addPrescription}
            >
                Add Prescription
            </button>
        </div>
    );
};

export default PrescriptionsEditor;
