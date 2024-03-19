import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../components/LandingModule/Landing'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
