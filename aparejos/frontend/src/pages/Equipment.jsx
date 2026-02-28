import React, { useState } from 'react'
import './Equipment.css'

export default function Equipment() {
  const [equipment, setEquipment] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    equipment_type: '',
    capacity_kg: '',
    status: 'Green'
  })

  const handleAddEquipment = (e) => {
    e.preventDefault()
    // TODO: Send to API
    setEquipment([...equipment, { id: Date.now(), ...formData }])
    setFormData({ code: '', name: '', equipment_type: '', capacity_kg: '', status: 'Green' })
    setShowForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="equipment-page">
      <div className="page-header">
        <h1>Gestión de Equipos</h1>
        <button className="primary" onClick={() => setShowForm(true)}>+ Agregar Equipo</button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Nuevo Equipo</h2>
            <form onSubmit={handleAddEquipment}>
              <div className="form-group">
                <label>Código</label>
                <input type="text" name="code" value={formData.code} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <select name="equipment_type" value={formData.equipment_type} onChange={handleChange} required>
                  <option value="">Seleccionar tipo</option>
                  <option value="Montacarga de cadena">Montacarga de cadena</option>
                  <option value="Cable de acero">Cable de acero</option>
                  <option value="Grillete">Grillete</option>
                  <option value="Gancho">Gancho</option>
                  <option value="Eslinga">Eslinga</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacidad (kg)</label>
                <input type="number" name="capacity_kg" value={formData.capacity_kg} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Green">Verde (Vigentes)</option>
                  <option value="Yellow">Amarillo (30 días)</option>
                  <option value="Red">Rojo (Vencido)</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="primary">Guardar</button>
                <button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="filters">
        <input type="text" placeholder="Buscar por código..." />
        <select>
          <option>Todos los tipos</option>
          <option>Montacarga de cadena</option>
          <option>Cable de acero</option>
          <option>Grillete</option>
          <option>Gancho</option>
          <option>Eslinga</option>
        </select>
        <select>
          <option>Todos los estados</option>
          <option>Verde (Vigentes)</option>
          <option>Amarillo (30 días)</option>
          <option>Rojo (Vencido)</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Capacidad (kg)</th>
            <th>Estado</th>
            <th>Última Insp. Externa</th>
            <th>Última Insp. en Obra</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipment.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No hay equipos registrados</td>
            </tr>
          ) : (
            equipment.map((item) => (
              <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.equipment_type}</td>
                <td>{item.capacity_kg}</td>
                <td className={`status-${item.status}`}>{item.status}</td>
                <td>{item.last_external_inspection_date || '-'}</td>
                <td>{item.last_field_inspection_date || '-'}</td>
                <td>
                  <button className="primary">Editar</button>
                  <button className="danger">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
