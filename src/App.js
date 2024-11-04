import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AuthForm from "./components/AuthForm";
import ImageUpload from "./components/ImageUpload";
import ImageGallery from "./components/ImageGallery";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <Router>
            <GlobalStyles />
            <Navbar token={token} onLogout={handleLogout} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage token={token} />} />
                    <Route path="/login" element={<AuthForm title="Login" isLogin />} />
                    <Route path="/register" element={<AuthForm title="Register" />} />
                    <Route
                        path="/upload"
                        element={token ? <ImageUpload token={token} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/gallery"
                        element={token ? <ImageGallery token={token} /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
