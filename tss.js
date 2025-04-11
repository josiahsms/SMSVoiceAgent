document.getElementById("speak-btn").addEventListener("click", async () => {
  const text = document.getElementById("text-input").value;
  const response = await fetch("/api/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  const audio = document.getElementById("audio");
  audio.src = audioUrl;
  audio.play();
});
