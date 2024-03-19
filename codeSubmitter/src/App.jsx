import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/LandingModule/Landing'
import AllSubmissionsTable from '../components/SubmissionsModule/AllSubmissions'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/submissions" element={<AllSubmissionsTable />}></Route>
      </Routes>
    </Router>
  )
}

export default App
