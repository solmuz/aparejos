import React from 'react'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Panel de Control</h1>
      <p>Bienvenido al Sistema de Gestión de Inspecciones de Equipos</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Equipos Totales</h3>
          <p className="stat-value">--</p>
        </div>
        <div className="stat-card">
          <h3>Verde (Vigentes)</h3>
          <p className="stat-value status-green">--</p>
        </div>
        <div className="stat-card">
          <h3>Amarillo (Próximos 30 días)</h3>
          <p className="stat-value status-yellow">--</p>
        </div>
        <div className="stat-card">
          <h3>Rojo (Vencido)</h3>
          <p className="stat-value status-red">--</p>
        </div>
      </div>

      <section className="recent-activity">
        <h2>Actividad Reciente</h2>
        <p>No hay actividad reciente</p>
      </section>
    </div>
  )
}
