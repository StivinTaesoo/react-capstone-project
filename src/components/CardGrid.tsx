import React from "react";
import "./styles/patientList.css";

interface Props {
    items: any[];
    emptyText?: string;
    children: (item: any) => React.ReactNode;
}

const CardGrid: React.FC<Props> = ({
    items,
    emptyText = "No records found",
    children,
}) => {
    return (
        <div className="patient-grid">
            {items.length === 0 ? (
                <div className="empty-state">{emptyText}</div>
            ) : (
                items.map((item) => children(item))
            )}
        </div>
    );
};

export default CardGrid;
