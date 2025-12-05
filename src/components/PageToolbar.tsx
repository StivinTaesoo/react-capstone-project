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
            <input
                className="search-input"
                placeholder={placeholder}
                value={search}
                onChange={(e) => onSearch(e.target.value)}
            />

            <div>
                <Link to={buttonLink} className="btn-primary">
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

export default PageToolbar;
