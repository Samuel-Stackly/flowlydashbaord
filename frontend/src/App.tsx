import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";

function Protected({ title }: { title?: string }) {
  return (
    <ProtectedRoute>
      {title ? <PlaceholderPage title={title} /> : <Dashboard />}
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Protected />} />
          <Route path="/revenue" element={<Protected title="Revenue" />} />
          <Route path="/customer-analytics" element={<Protected title="Customer Analytics" />} />
          <Route path="/product" element={<Protected title="Product" />} />
          <Route path="/sales-funnel" element={<Protected title="Sales & Funnel" />} />
          <Route path="/settings" element={<Protected title="Settings" />} />
          <Route path="/integrations" element={<Protected title="Integrations" />} />
          <Route path="/support" element={<Protected title="Support & Success" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
