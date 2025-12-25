import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopBar from "./components/layout/TopBar"
import Header from "./components/layout/Header"
import SuggestionListPage from "./pages/SuggestionListPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import { Toaster } from "react-hot-toast"
import UserListPage from "./pages/UserListPage"
import MapDisplayPage from "./pages/MapDisplayPage"
import PlaceDetail from "./pages/PlaceDetail"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import GetOTPPage from "./pages/GetOTPPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ConfirmedChangePasswordPage from "./pages/ConfirmedChangePasswordPage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />

        <div className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/list" element={<SuggestionListPage />} />
            <Route path="/list/:type/:id" element={<PlaceDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/map" element={<MapDisplayPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/get-otp" element={<GetOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/password-changed" element={<ConfirmedChangePasswordPage />} />
          </Routes>
        </div>

        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App
