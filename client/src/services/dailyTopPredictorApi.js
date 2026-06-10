const API_URL = import.meta.env.VITE_API_URL;

export async function getDailyTopPredictor() {
  const response = await fetch(`${API_URL}/daily-top-predictor`);

  if (!response.ok) {
    throw new Error("Daily top predictor request failed");
  }

  return response.json();
}
