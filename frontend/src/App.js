import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">🚀 CloudOps Demo with Claude </div>
        <nav>
          <a href="#features">Features</a>
          <a href="#architecture">Architecture</a>
          <a href="#status">Status</a>
        </nav>
      </header>

      <main className="hero-container">
        <span className="badge">Automated Deployment</span>
        <h1>OpenTofu + Terragrunt + React</h1>
        <p>
          This website is statically hosted on Amazon S3, served securely via Amazon CloudFront CDN (OAC), and deployed through GitHub Actions.
        </p>

        <div className="card-container">
          <div className="card">
            <h3>Environment Interactive Check</h3>
            <p>Test React local component state execution:</p>
            <div className="interactive-box">
              <button onClick={() => setCount(count - 1)}>-</button>
              <span className="counter-value">{count}</span>
              <button onClick={() => setCount(count + 1)}>+</button>
            </div>
          </div>

          <div className="card">
            <h3>Pipeline Info</h3>
            <ul>
              <li><strong>Infra Engine:</strong> OpenTofu & Terragrunt</li>
              <li><strong>Hosting:</strong> S3 + CloudFront CDN</li>
              <li><strong>CI/CD:</strong> GitHub Actions Workflow</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Enterprise Cloud Operations. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
