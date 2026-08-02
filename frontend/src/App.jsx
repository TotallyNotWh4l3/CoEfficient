import Dashboard from "./components/Dashboard/Dashboard";
import DialogManager from "./components/Settings/Components/UI/Dialog/DialogManager";
import Login from "./components/Login/Login";

// Hooks
import { useSettingsState } from "./hooks/useSettings";
import { useDashboardState } from "./hooks/useDashboard";
import { useDialogState } from "./hooks/useDialog";
import { useTheme } from "./hooks/useTheme";
import { useAuthState, useAuth } from "./hooks/useAuth";

// Context
import { SettingsProvider } from "./context/SettingsContext";
import { DashboardProvider } from "./context/DashboardContext";
import { DialogProvider } from "./context/DialogContext";
import { AuthProvider } from "./context/AuthContext";

// CSS
import "./styles/global.css";
import "./styles/variable.css";

function ThemeApplier() {
    useTheme();
    return null;
}

function AppContent() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ThemeApplier />

            {user ? <Dashboard /> : <Login />}

            <DialogManager />
        </>
    );
}

export default function App() {
    const authState = useAuthState();

    // Wait for auth before loading user settings
    const settingsState = useSettingsState(authState);

    const dashboardState = useDashboardState();
    const dialogState = useDialogState();

    return (
        <AuthProvider value={authState}>
            <SettingsProvider value={settingsState}>
                <DashboardProvider value={dashboardState}>
                    <DialogProvider value={dialogState}>
                        <AppContent />
                    </DialogProvider>
                </DashboardProvider>
            </SettingsProvider>
        </AuthProvider>
    );
}
