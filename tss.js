document.getElementById("speak-btn").addEventListener("click", async () => {
  const text = document.getElementById("text-input").value;
  const response = await fetch("/api/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "speech.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});