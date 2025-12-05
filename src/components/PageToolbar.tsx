import React from "react";
import { Link } from "react-router-dom";
import "./styles/patientList.css";

interface Props {
    search: string;
    onSearch: (value: string) => void;
    buttonText: string;
    buttonLink: string;
    placeholder?: string;
}

const PageToolbar: React.FC<Props> = ({
    search,
    onSearch,
    buttonText,
    buttonLink,
    placeholder = "Search...",
}) => {
    return (
        <div className="toolbar">
            <div className="search-container">
                <input
                    className="search-input"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                />

                {search && (
                    <button
                        className="clear-button"
                        onClick={() => onSearch("")}
                        type="button"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div>
                <Link to={buttonLink} className="btn-primary">
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

export default PageToolbar;
