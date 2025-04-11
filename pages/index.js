import { useState } from "react";

export default function Home() {
  const [word, setWord] = useState("");
  const [sayAs, setSayAs] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/pronunciations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, sayAs }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Saved: "${word}" will be pronounced "${sayAs}"`);
      setWord("");
      setSayAs("");
    } else {
      setMessage(`Error: ${data.error || "Something went wrong"}`);
    }
  };

  return (
    <div className="container">
      <h1>Pronunciation Memory</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pronounce as"
          value={sayAs}
          onChange={(e) => setSayAs(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
