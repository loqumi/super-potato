import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { List } from 'react-bootstrap-icons';
import DoctorsPage from './pages/DoctorsPage';
import NursesPage from './pages/NursesPage';
import './App.css';

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Hospital Staff</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <List />
                    </button>
                    <div className={`collapse navbar-collapse flex-grow-0 ${isMenuOpen ? 'show' : ''}`}>
                        <div className="navbar-nav">
                            <Link
                                className="nav-link"
                                to="/doctors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Doctors
                            </Link>
                            <Link
                                className="nav-link"
                                to="/nurses"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Nurses
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/nurses" element={<NursesPage />} />
                <Route path="/" element={<div className="container mt-4">Select a page from navigation</div>} />
            </Routes>
        </Router>
    );
};

export default App;