import { useEffect, useState } from "react"
import { getUser } from "../services/usersApi"

function useUser(name) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!name) return

        fetchUser()
    }, [name])

    async function fetchUser() {
        try {
            setError(null)

            const data = await getUser(name)

            setUser(data)
        } catch (error) {
            setError("Kasutaja laadimine ebaõnnestus")
        } finally {
            setLoading(false)
        }
    }

    return {
        user,
        loading,
        error
    }
}

export default useUser