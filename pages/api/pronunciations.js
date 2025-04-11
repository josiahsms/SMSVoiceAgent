
export default async function handler(req, res) {
  const { method } = req;
  const UPSTASH_URL = process.env.UPSTASH_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_TOKEN;

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: "Missing Upstash config" });
  }

  if (method === "POST") {
    const { word, sayAs } = req.body;

    try {
      const saveRes = await fetch(
        `${UPSTASH_URL}/set/${encodeURIComponent(word)}/${encodeURIComponent(sayAs)}`,
        {
          method: "POST",
          headers: {
            Authorization: `${UPSTASH_TOKEN}`,
          },
        }
      );

      const result = await saveRes.json();
      return res.status(200).json({ message: "Saved", result });
    } catch (err) {
      return res.status(500).json({ error: "Failed to save pronunciation" });
    }
  }

  if (method === "GET") {
    const { word } = req.query;

    try {
      const fetchRes = await fetch(
        `${UPSTASH_URL}/get/${encodeURIComponent(word)}`,
        {
          headers: {
            Authorization: `${UPSTASH_TOKEN}`,
          },
        }
      );

      const data = await fetchRes.json();
      return res.status(200).json({ word, sayAs: data.result });
    } catch (err) {
      return res.status(500).json({ error: "Failed to retrieve pronunciation" });
    }
  }

  res.status(405).end("Method Not Allowed");
}

