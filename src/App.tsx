import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUp from "./pages/auth/SignUp";
import PatientListPage from "./pages/patients/PatientListPage";
import PatientDetailPage from "./pages/patients/PatientDetailPage";
import PatientEditPage from "./pages/patients/PatientEditPage";
import StaffListPage from "./pages/staff/StaffListPage";
import StaffDetailPage from "./pages/staff/StaffDetailPage";
import StaffEditPage from "./pages/staff/StaffEditPage";
import DrugsListPage from "./pages/drugs/DrugsListPage";
import DrugDetailPage from "./pages/drugs/DrugDetailPage";
import DrugEditPage from "./pages/drugs/DrugEditPage";
import { runSeederIfNeeded } from "./utils/sampleDataSeeder";
import MainLayout from "./layouts/MainLayout";
import "./App.css";
import LoadingIndicator from "./components/LoadingIndicator";

function RequireAuth({ children }: { children: React.JSX.Element }) {
    const auth = useAuth();

    if (auth.initializing) {
        return <LoadingIndicator />;
    }

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="patients">
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <PatientListPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="new"
                            element={
                                <RequireAuth>
                                    <PatientEditPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":id"
                            element={
                                <RequireAuth>
                                    <PatientDetailPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":id/edit"
                            element={
                                <RequireAuth>
                                    <PatientEditPage />
                                </RequireAuth>
                            }
                        />
                    </Route>

                    <Route path="staff">
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <StaffListPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="new"
                            element={
                                <RequireAuth>
                                    <StaffEditPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":id"
                            element={
                                <RequireAuth>
                                    <StaffDetailPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":id/edit"
                            element={
                                <RequireAuth>
                                    <StaffEditPage />
                                </RequireAuth>
                            }
                        />
                    </Route>

                    <Route path="drugs">
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <DrugsListPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="new"
                            element={
                                <RequireAuth>
                                    <DrugEditPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":id"
                            element={
                                <RequireAuth>
                                    <DrugDetailPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=":id/edit"
                            element={
                                <RequireAuth>
                                    <DrugEditPage />
                                </RequireAuth>
                            }
                        />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

function AppRoot() {
    React.useEffect(() => {
        runSeederIfNeeded();
    }, []);
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}

export default AppRoot;
