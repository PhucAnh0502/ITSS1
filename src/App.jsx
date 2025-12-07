import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"
import TopBar from "./components/layout/TopBar"
import Header from "./components/layout/Header"
import SuggestionListPage from "./pages/SuggestionListPage"
import RegisterPage from "./pages/RegisterPage"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />

        <div className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/suggest" element={<SuggestionListPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>

        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App
