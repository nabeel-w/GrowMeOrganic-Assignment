import React from 'react'
import { Route, Routes } from "react-router-dom"
import "./index.css"
import LoginPage from './LoginPage'
import HomePage from './HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
