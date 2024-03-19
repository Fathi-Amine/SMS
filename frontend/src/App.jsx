import React, {useEffect} from 'react'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import {FiSettings} from "react-icons/fi";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {Navbar, Sidebar, Footer, ThemeSettings} from "./components/index.jsx";
import {
    Ecommerce,
    Employees,
    Calendar,
    Stacked,
    Pyramid,
    Customers,
    Kanban,
    Area,
    Bar,
    Pie,
    Financial,
    ColorPicker,
    ColorMapping,
    Editor,
    Line
} from "./pages/index.jsx";
import './App.css'
import {useSelector} from "react-redux";
import Home from "./pages/Home.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="" element={<PrivateRoutes />} >
                    <Route path="/admin/*" element={<Dashboard />} /> // Use the PrivateRoute component for the Dashboard route
                </Route>
            </Routes>
        </Router>
    )
}

export default App
