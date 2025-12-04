const Footer: React.FC = () => (
    <footer className="footer">
        <div>© {new Date().getFullYear()} Patient Data Manager — Demo</div>
        <div>Frontend-only simulation (localStorage)</div>
        <style>{`
      .footer{ margin-top:24px; padding:12px; text-align:center; color:#666; font-size:13px;}
    `}</style>
    </footer>
);

export default Footer;
