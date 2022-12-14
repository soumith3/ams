import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '../components/navbar'
import ContactUs from '../pages/contactus'
import Login from '../pages/login'
import Footer from '../components/footer'
import SignUp from '../pages/signup'
import HomePage from '../pages/homepage'
import CreateSection from '../pages/createsection'
import ProfessionalDashboard from '../pages/professordashboard'
import CreateAttendance from '../pages/createattendance'
import StudentDashboard from '../pages/studentdashboard'

export default function AppRouter() {

    return (
        <div>
            <NavBar />
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/createsection" element={<CreateSection />} />
                        <Route path="/professionaldashboard" element={<ProfessionalDashboard />} />
                        <Route path="/createattendance/:sectionid" element={<CreateAttendance />} />
                        <Route path="/studentdashboard" element={<StudentDashboard />} />
                    </Routes>
                </Suspense>
            </Router>
            <Footer />
        </div>
    )
}