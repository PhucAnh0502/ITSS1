import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopBar from "./components/layout/TopBar"
import Header from "./components/layout/Header"
import SuggestionListPage from "./pages/SuggestionListPage"
import RegisterPage from "./pages/RegisterPage"
import { Toaster } from "react-hot-toast"
import UserListPage from "./pages/UserListPage"
import MapDisplayPage from "./pages/MapDisplayPage"
import PlaceDetail from "./pages/PlaceDetail"

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
            <Route path="/users" element={<UserListPage />} />
            <Route path="/map" element={<MapDisplayPage />} />
          </Routes>
        </div>

        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App
