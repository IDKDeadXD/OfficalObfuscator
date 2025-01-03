import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'; // Make sure the styles are imported

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">Obfuscator</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/credits" className="nav-link">Credits</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.files.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('https://obfuscatorwebbackend.onrender.com/obfuscate', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'obfuscated_scripts.zip';
        link.click();
      } else {
        alert('Failed to obfuscate files');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="obfuscator-box">
        <h2>Upload JavaScript Files for Obfuscation</h2>
        <form onSubmit={handleFileUpload}>
          <input type="file" name="files" multiple />
          <button type="submit">Obfuscate</button>
        </form>
      </div>
    </div>
  );
}

function Credits() {
  return (
    <div className="credits-container">
      <h2>Credits</h2>
      <p>This project was created by [Your Name].</p>
      <p>JavaScript obfuscation powered by <a href="https://github.com/javascript-obfuscator/javascript-obfuscator" target="_blank" rel="noopener noreferrer">JavaScript Obfuscator</a>.</p>
    </div>
  );
}

export default App;
