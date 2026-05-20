import { useEffect, useState } from "react"
import { getLeaderboard } from "../services/api"

function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLeaderboard()

    const interval = setInterval(() => {
      fetchLeaderboard()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  async function fetchLeaderboard() {
    try {
      setError(null)

      const data = await getLeaderboard()
      setLeaderboard(data)
    } catch (error) {
      setError("Edetabeli laadimine ebaõnnestus")
    } finally {
      setLoading(false)
    }
  }

  return {
    leaderboard,
    loading,
    error
  }
}

export default useLeaderboard