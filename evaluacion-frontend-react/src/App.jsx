import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecoveryPassword from "./pages/RecoveryPassword";
import Layout from "./components/Layout";
import CrudPage from "./pages/CrudPage";
import { resources } from "./data/resources";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery-password" element={<RecoveryPassword />} />
      <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="estudiantes" replace />} />
        {resources.map((resource) => (
          <Route key={resource.key} path={resource.key} element={<CrudPage config={resource} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
