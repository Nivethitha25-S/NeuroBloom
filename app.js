document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value.trim();
  const output = document.getElementById("output");

  if (!userInput) {
    output.textContent = "Please enter your thoughts first 🌸";
    return;
  }

  output.textContent = "Analyzing your mood... 🌿";

  try {
    // Simulate AI wellness response (you can connect real API here)
    const response = await getWellnessFeedback(userInput);
    output.textContent = response.message;
  } catch (error) {
    output.textContent = "Offline mode active. Try again later 🌸";
  }
});

// Offline caching fallback
async function getWellnessFeedback(inputData) {
  const cache = await caches.open("neurobloom-data");
  const request = new Request('/ai-feedback?data=${inputData}');

  try {
    // Simulate an API fetch
    const response = await fetch(request);
    cache.put(request, response.clone());
    return await response.json();
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse
      ? await cachedResponse.json()
      : { message: "Offline mode active. Try again later 🌸" };
  }
}