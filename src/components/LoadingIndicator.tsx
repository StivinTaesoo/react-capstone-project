import React from "react";
import "./styles/sections.css";

const LoadingIndicator: React.FC<{ size?: number }> = ({ size = 36 }) => {
    return (
        <div
            style={{ width: size, height: size, display: "inline-block" }}
            aria-hidden
        >
            <svg viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }}>
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
            </svg>
        </div>
    );
};

export default LoadingIndicator;
