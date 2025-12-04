import React from "react";

const LoadingIndicator: React.FC<{ size?: number }> = ({ size = 36 }) => {
    return (
        <div
            style={{ width: size, height: size, display: "inline-block" }}
            aria-hidden
        >
            <svg viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }}>
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
            </svg>
            <style>{`
        svg { animation: spin 1s linear infinite; }
        circle { stroke: #667eea; stroke-linecap: round; stroke-dasharray: 31.4 31.4; stroke: #667eea; stroke-opacity: .9; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default LoadingIndicator;
