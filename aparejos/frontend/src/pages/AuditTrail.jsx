import React, { useState } from 'react'
import './AuditTrail.css'

export default function AuditTrail() {
  const [auditLogs, setAuditLogs] = useState([])
  const [filter, setFilter] = useState('all')

  return (
    <div className="audit-trail-page">
      <h1>Registro de Auditoría</h1>
      
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas las Acciones</option>
          <option value="CREATE">Crear</option>
          <option value="UPDATE">Actualizar</option>
          <option value="DELETE">Eliminar</option>
        </select>
        <input type="date" />
        <input type="date" />
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha/Hora</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Tipo de Entidad</th>
            <th>ID de Entidad</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {auditLogs.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No hay registros de auditoría</td>
            </tr>
          ) : (
            auditLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.created_at}</td>
                <td>{log.user_id}</td>
                <td>{log.action}</td>
                <td>{log.entity_type}</td>
                <td>{log.entity_id}</td>
                <td>{log.details}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
