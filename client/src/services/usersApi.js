const API_URL = import.meta.env.VITE_API_URL

export async function getUser(name) {
  const response = await fetch(
    `${API_URL}/users/${name}`
  )

  if (!response.ok) {
    throw new Error("User request failed")
  }

  return response.json()
}