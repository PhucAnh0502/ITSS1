import React from "react"
import { BrowserRouter, Routes, Route } from "react-router"
import TopBar from "./components/layout/TopBar"
import Header from "./components/layout/Header"
import SuggestionListPage from "./pages/SuggestionListPage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />

        <div className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/suggest" element={<SuggestionListPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
