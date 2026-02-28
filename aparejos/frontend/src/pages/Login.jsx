import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/dataService'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: Implement login call to API
      console.log('Login:', username, password)
      localStorage.setItem('token', 'mock-token')
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sistema de Inspecciones de Equipos</h1>
        <p>Gestión de Inspecciones de Equipos de Izaje</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
