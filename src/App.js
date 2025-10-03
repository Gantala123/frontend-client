import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TextSubmission from './components/TextSubmission';
import WordQuery from './components/WordQuery';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Word Count Application</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Submit Text</Link>
              </li>
              <li>
                <Link to="/query">Query Word Count</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TextSubmission />} />
            <Route path="/query" element={<WordQuery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
