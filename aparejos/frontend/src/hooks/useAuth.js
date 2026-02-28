import { useState, useCallback } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  const login = useCallback((token) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout }
}

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network response was not ok')
      const json = await response.json()
      setData(json)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [url])

  return { data, loading, error, fetchData }
}
