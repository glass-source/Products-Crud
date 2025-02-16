import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProductPage } from "./pages/ProductPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-product" element={<ProductPage />} />
            <Route path="/edit-product/:id" element={<ProductPage edit />} />
          

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}