// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Search from "./components/search";
import { mockData } from "./utils/mockData";
import axios from "axios";

// Example Page
function Home() {
  return <h2>Home Page</h2>;
}

// Dark Mode Toggle Component
function DarkModeToggle({ isDark, toggleDarkMode }) {
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        ...styles.toggleButton,
        backgroundColor: isDark ? '#4a5568' : '#e2e8f0',
        color: isDark ? '#fff' : '#2d3748'
      }}
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

// Navbar Component
function Navbar({ isDark, toggleDarkMode }) {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/search" style={styles.link}>Search</Link>
      {/* You can add more microservice links here */}
      <div style={styles.navbarRight}>
        <DarkModeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </div>
    </nav>
  );
}

// fetchSuggestions using mock data
const fetchSuggestions = async (query, signal) => {
  try {
    const response = await axios.get("http://localhost:5000/search", {
      params: { q: query },
      signal, // use AbortController signal directly
    });
    return response.data;
  } catch (err) {
    if (axios.isCancel?.(err)) return []; // optional, usually not needed with signal
    throw err;
  }
};

// App Component
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or default to false
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Apply dark class to document element and save to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return (
    <>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search fetchSuggestions={fetchSuggestions} />} />
          {/* Add more microservices pages here */}
        </Routes>
      </div>
    </>
  );
}

// Simple inline styles
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "10px",
    background: "#333",
    justifyContent: "space-between",
  },
  navbarRight: {
    marginLeft: "auto",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: {
    padding: "20px",
  },
  toggleButton: {
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s ease",
    minWidth: "44px",
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};