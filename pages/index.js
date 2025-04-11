// pages/index.js
import { useState } from 'react';

export default function Home() {
  // State to manage the input values for word and pronunciation
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [message, setMessage] = useState('');

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Post the data to the API
    const response = await fetch('/api/pronunciations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, pronunciation }),
    });

    // Get the response message
    const data = await response.json();
    setMessage(data.message);

    // Clear the form fields
    setWord('');
    setPronunciation('');
  };

  return (
    <div>
      <h1>Text-to-Speech App</h1>
      <p>Enter a word and its pronunciation to save it for speech synthesis.</p>

      {/* Form to input word and pronunciation */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">Word:</label>
        <input
          type="text"
          id="word"
          name="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />

        <label htmlFor="pronunciation">Pronunciation:</label>
        <input
          type="text"
          id="pronunciation"
          name="pronunciation"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          required
        />

        <button type="submit">Save Pronunciation</button>
      </form>

      {/* Message area to display success or error */}
      {message && <p>{message}</p>}
    </div>
  );
}
