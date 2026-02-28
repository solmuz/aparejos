import React from 'react'
import './Layout.css'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>Gestor de Inspecciones de Equipos</h1>
          </div>
          <ul className="navbar-menu">
            <li><a href="/">Panel de Control</a></li>
            <li><a href="/equipment">Equipos</a></li>
            <li><a href="/inspections">Inspecciones</a></li>
            <li><a href="/reports">Reportes</a></li>
            <li><a href="/audit">Registro de Auditoría</a></li>
            <li><a href="/login">Cerrar Sesión</a></li>
          </ul>
        </div>
      </nav>

      <div className="main-content">
        {children}
      </div>

      <footer className="footer">
        <p>&copy; 2025 Sistema de Gestión de Inspecciones de Equipos. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
