import React from "react";

interface Props {
    diagnoses: string[];
    addDiagnosis: () => void;
    updateDiagnosis: (index: number, value: string) => void;
    removeDiagnosis: (index: number) => void;
}

const DiagnosesEditor: React.FC<Props> = ({
    diagnoses,
    addDiagnosis,
    updateDiagnosis,
    removeDiagnosis,
}) => {
    return (
        <div className="form-group">
            <label>Diagnoses</label>

            {diagnoses.map((diagnosis, index) => (
                <div key={index} className="diagnosis-row">
                    <input
                        value={diagnosis}
                        onChange={(e) => updateDiagnosis(index, e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn-danger"
                        onClick={() => removeDiagnosis(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="btn-secondary"
                onClick={addDiagnosis}
            >
                Add Diagnosis
            </button>
        </div>
    );
};

export default DiagnosesEditor;
