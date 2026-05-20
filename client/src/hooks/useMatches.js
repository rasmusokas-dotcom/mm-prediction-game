import { useEffect, useState } from "react"
import { getMatches } from "../services/api"

function useMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMatches()

    const interval = setInterval(() => {
      fetchMatches()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  async function fetchMatches() {
    try {
      setError(null)

      const data = await getMatches()
      setMatches(data)
    } catch (error) {
      setError("Mängude laadimine ebaõnnestus")
    } finally {
      setLoading(false)
    }
  }

  return {
    matches,
    loading,
    error
  }
}

export default useMatches