import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TimeAnalysis from './pages/TimeAnalysis'
import Predictions from './pages/Predictions'
import Optimization from './pages/Optimization'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/time-analysis" element={<TimeAnalysis />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/optimization" element={<Optimization />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App