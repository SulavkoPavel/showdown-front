import LoginPage from "./pages/Login/LoginPage.tsx";
import RegisterPage from "./pages/Register/RegisterPage.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import MyTablesPage from "./pages/MyTables/MyTablesPage.tsx";
import CreateTablePage from "./pages/CreateTable/CreateTablePage.tsx";
import TableSettingsPage from "./pages/TableSettings/TableSettingsPage.tsx";
import GamePage from "./pages/Game/GamePage.tsx";
import ConfirmEmailInfoPage from "./pages/ConfirmEmailInfo/ConfirmEmailInfoPage.tsx";
import ConfirmEmailPage from "./pages/ConfirmEmail/ConfirmEmailPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/my-tables" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/confirm-email-info" element={<ConfirmEmailInfoPage />} />
                <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                <Route path="/my-tables" element={<MyTablesPage />} />
                <Route path="/create-table" element={<CreateTablePage />} />
                <Route path="/tables/:tableId/settings" element={<TableSettingsPage />} />
                <Route path="/:tableId" element={<GamePage   />} />
            </Routes>
        </Router>
    );
}

export default App;