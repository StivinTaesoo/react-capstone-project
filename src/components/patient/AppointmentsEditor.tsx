import React from "react";
import "../styles/patientList.css";

interface Appointment {
    id: number;
    dateISO: string;
    notes: string;
}

interface Props {
    appointments: Appointment[];
    addAppointment: () => void;
    updateAppointment: (id: number, field: string, value: any) => void;
    removeAppointment: (id: number) => void;
}

const AppointmentsEditor: React.FC<Props> = ({
    appointments,
    addAppointment,
    updateAppointment,
    removeAppointment,
}) => {
    return (
        <div className="form-group">
            <label>Appointments</label>

            {appointments.map((appt) => (
                <div key={appt.id} className="sub-section">
                    <div>
                        <label>Date & Time</label>
                        <input
                            type="datetime-local"
                            value={appt.dateISO.slice(0, 16)}
                            onChange={(e) =>
                                updateAppointment(
                                    appt.id,
                                    "dateISO",
                                    new Date(e.target.value).toISOString()
                                )
                            }
                        />
                    </div>

                    <div>
                        <label>Notes</label>
                        <input
                            value={appt.notes}
                            onChange={(e) =>
                                updateAppointment(
                                    appt.id,
                                    "notes",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <button
                        type="button"
                        className="btn-danger"
                        onClick={() => removeAppointment(appt.id)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="btn-secondary"
                onClick={addAppointment}
            >
                Add Appointment
            </button>
        </div>
    );
};

export default AppointmentsEditor;
