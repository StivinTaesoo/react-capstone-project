import AppContent from "./components/appContent";
import { AuthProvider } from "./context/Provider";
import "./App.css";

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
