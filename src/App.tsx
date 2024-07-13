import LoginPage from "./pages/Login/LoginPage.tsx";
import RegisterPage from "./pages/Register/RegisterPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTablesPage from "./pages/MyTables/MyTablesPage.tsx";
import CreateTablePage from "./pages/CreateTable/CreateTablePage.tsx";
import TableSettingsPage from "./pages/TableSettings/TableSettingsPage.tsx";
import ProfileSettingsPage from "./pages/ProfileSettings/ProfileSettingsPage.tsx";
import GamePage from "./pages/Game/GamePage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile-settings" element={<ProfileSettingsPage />} />
                <Route path="/my-tables" element={<MyTablesPage />} />
                <Route path="/create-table" element={<CreateTablePage />} />
                <Route path="/tables/:tableId/settings" element={<TableSettingsPage />} />
                <Route path="/:tableId" element={<GamePage   />} />
            </Routes>
        </Router>
    );
}

export default App;