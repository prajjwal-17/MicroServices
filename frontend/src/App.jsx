// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/search";
import { mockData } from "./utils/mockData";
import axios from "axios";


// Example Page
function Home() {
  return <h2>Home Page</h2>;
}

// Navbar Component
function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/search" style={styles.link}>Search</Link>
      {/* You can add more microservice links here */}
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
  return (
    <Router>
      <Navbar />
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search fetchSuggestions={fetchSuggestions} />} />
          {/* Add more microservices pages here */}
        </Routes>
      </div>
    </Router>
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
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: {
    padding: "20px",
  },
};
