import React, { useState } from 'react';
import axios from 'axios';

const WordQuery = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!word.trim()) {
      setError('Please enter a word');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`http://localhost:8082/api/count/${word.trim().toLowerCase()}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error querying word count:', error);
      setError('Error retrieving word count. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'N/A';
    return new Date(dateTimeStr).toLocaleString();
  };

  return (
    <div className="word-query">
      <h2>Query Word Count</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="word">Enter Word:</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word to query"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          Query
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Results for: {result.word}</h3>
          <p><strong>Count:</strong> {result.count}</p>
          <p><strong>First Occurrence:</strong> {formatDateTime(result.firstOccurrence)}</p>
          <p><strong>Last Occurrence:</strong> {formatDateTime(result.lastOccurrence)}</p>
        </div>
      )}
    </div>
  );
};

export default WordQuery;