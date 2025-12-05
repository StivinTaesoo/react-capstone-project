import "./styles/sections.css";

const Footer: React.FC = () => (
    <footer className="footer">
        <div>
            © {new Date().getFullYear()} Specledot Clinic Manager System —
            Stephen Tersoo
        </div>
        <div>EHA Academy Advanced Javascript Cohort Capstone Project</div>
    </footer>
);

export default Footer;
