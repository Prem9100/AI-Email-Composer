import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import GenerateEmail from "./pages/GenerateEmail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ViewEmail from "./pages/ViewEmail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/generate"
                element={
                    <ProtectedRoute>
                        <GenerateEmail />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <History />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/emails/:id"
                element={
                    <ProtectedRoute>
                        <ViewEmail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/register"
                element={<Register />}
            />

        </Routes>

    );

}

export default App;