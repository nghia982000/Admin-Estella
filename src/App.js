import './_App.scss'
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import FacilityBooking from './Pages/FacilityBooking'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resident/facilitybooking" element={<FacilityBooking />} />
      </Routes>
    </Router>
  )
}

export default App;
