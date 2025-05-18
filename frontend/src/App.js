import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeEditor from './pages/ResumeEditor';
import Templates from './pages/Templates';
import Career from './pages/resources/Career';
import Blog from './pages/resources/Blog';
import ResumeTips from './pages/resources/ResumeTips';
import FAQ from './pages/resources/FAQ';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <MyNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/editor"
              element={
                <PrivateRoute>
                  <ResumeEditor />
                </PrivateRoute>
              }
            />

            <Route
              path="/templates"
              element={
                <PrivateRoute>
                  <Templates />
                </PrivateRoute>
              }
            />

            {/* Resource Routes */}
            <Route path="/resources/career" element={<Career />} />
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/resume-tips" element={<ResumeTips />} />
            <Route path="/resources/faq" element={<FAQ />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;





