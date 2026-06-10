import { useEffect, useState } from "react";
import { getDailyTopPredictor } from "../services/dailyTopPredictorApi";

function useDailyTopPredictor() {
  const [dailyTopPredictor, setDailyTopPredictor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyTopPredictor();
  }, []);

  async function fetchDailyTopPredictor() {
    try {
      setError(null);

      const data = await getDailyTopPredictor();

      setDailyTopPredictor(data);
    } catch (error) {
      setError("Päeva ennustaja laadimine ebaõnnestus");
    } finally {
      setLoading(false);
    }
  }

  return {
    dailyTopPredictor,
    loading,
    error,
  };
}

export default useDailyTopPredictor;
