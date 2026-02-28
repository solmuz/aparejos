import React, { useState } from 'react'
import './Reports.css'

export default function Reports() {
  const [reportType, setReportType] = useState('equipment-status')

  return (
    <div className="reports-page">
      <h1>Reportes</h1>

      <div className="report-options">
        <div className="report-card">
          <h3>Reporte de Estado de Equipos</h3>
          <p>Estado semáforo (Verde/Amarillo/Rojo) por equipo</p>
          <button className="primary">Generar Reporte</button>
          <button>Exportar PDF</button>
          <button>Exportar CSV</button>
        </div>

        <div className="report-card">
          <h3>Reporte de Desincorporación</h3>
          <p>Registros de desincorporación de equipos</p>
          <button className="primary">Generar Reporte</button>
          <button>Exportar PDF</button>
          <button>Exportar CSV</button>
        </div>

        <div className="report-card">
          <h3>Calendario de Inspecciones</h3>
          <p>Próximas inspecciones programadas</p>
          <button className="primary">Generar Reporte</button>
          <button>Exportar PDF</button>
          <button>Exportar CSV</button>
        </div>

        <div className="report-card">
          <h3>Reporte de Cumplimiento</h3>
          <p>Estado de cumplimiento de equipos</p>
          <button className="primary">Generar Reporte</button>
          <button>Exportar PDF</button>
          <button>Exportar CSV</button>
        </div>
      </div>
    </div>
  )
}
