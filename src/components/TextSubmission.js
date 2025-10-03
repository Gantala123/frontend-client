import React, { useState } from 'react';
import axios from 'axios';

const TextSubmission = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setStatus('Please enter some text');
      return;
    }

    setLoading(true);
    setStatus('Processing...');

    try {
      await axios.post('http://localhost:8081/api/ingest/text', { text });
      setStatus('Text processed successfully!');
      setText('');
    } catch (error) {
      console.error('Error submitting text:', error);
      setStatus('Error processing text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-submission">
      <h2>Submit Text</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Enter Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="10"
            cols="50"
            placeholder="Enter text to process..."
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default TextSubmission;