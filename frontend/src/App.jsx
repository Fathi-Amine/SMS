import React, {useEffect} from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'

import './App.css'
import {useSelector} from "react-redux";
import Home from "./pages/Home.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TeacherDashboard from "./pages/teacherDashboard.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*"
                       element={
                    <PrivateRoute role="admin">
                        <Dashboard />
                    </PrivateRoute>}
                />
                <Route path="/teacher/*"
                       element={
                    <PrivateRoute
                        role="teacher">
                        <TeacherDashboard />
                    </PrivateRoute>}
                />
                {/*<Route path="" element={<PrivateRoutes />} >
                    <Route path="/admin/*" element={<Dashboard />} />
                    <Route path="/teacher/*" element={<TeacherDashboard />} />
                </Route>*/}
            </Routes>
        </Router>
    )
}

export default App
