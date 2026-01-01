import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import SuggestionListPage from "./pages/SuggestionListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import UserListPage from "./pages/UserListPage";
import MapDisplayPage from "./pages/MapDisplayPage";
import PlaceDetail from "./pages/PlaceDetail";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import GetOTPPage from "./pages/GetOTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ConfirmedChangePasswordPage from "./pages/ConfirmedChangePasswordPage";
import SettingPage from "./pages/SettingPage";
import { LanguageProvider } from "./context/LanguageContext";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <TopBar />
          <Header />

          <div className="flex-1 bg-gray-50">
            <Routes>
              <Route
                element={
                  <PrivateRoutes>
                    <Outlet />
                  </PrivateRoutes>
                }
              >
                <Route path="/list" element={<SuggestionListPage />} />
                <Route path="/list/:type/:id" element={<PlaceDetail />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/map" element={<MapDisplayPage />} />
                <Route
                  path="/password-changed"
                  element={<ConfirmedChangePasswordPage />}
                />
                <Route path="/settings" element={<SettingPage />} />
              </Route>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/get-otp" element={<GetOTPPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
