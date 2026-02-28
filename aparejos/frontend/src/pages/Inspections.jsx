import React, { useState } from 'react'
import './Inspections.css'

export default function Inspections() {
  const [activeTab, setActiveTab] = useState('external')
  const [externalInspections, setExternalInspections] = useState([])
  const [fieldInspections, setFieldInspections] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [inspectionType, setInspectionType] = useState('external')
  
  const [externalFormData, setExternalFormData] = useState({
    inspection_date: '',
    next_inspection_date: '',
    inspection_status: '',
    responsible_company: '',
    inspection_criteria: '',
    serial_marking: '',
    certificate_file: null
  })

  const [fieldFormData, setFieldFormData] = useState({
    inspection_date: '',
    inspection_criteria: '',
    responsible_person: '',
    photos: null
  })

  const handleAddInspection = (e) => {
    e.preventDefault()
    
    if (inspectionType === 'external') {
      setExternalInspections([...externalInspections, { id: Date.now(), ...externalFormData }])
      setExternalFormData({
        inspection_date: '',
        next_inspection_date: '',
        inspection_status: '',
        responsible_company: '',
        inspection_criteria: '',
        serial_marking: '',
        certificate_file: null
      })
    } else {
      setFieldInspections([...fieldInspections, { id: Date.now(), ...fieldFormData }])
      setFieldFormData({
        inspection_date: '',
        inspection_criteria: '',
        responsible_person: '',
        photos: null
      })
    }
    
    setShowForm(false)
  }

  const handleExternalChange = (e) => {
    const { name, value } = e.target
    setExternalFormData({ ...externalFormData, [name]: value })
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFieldFormData({ ...fieldFormData, [name]: value })
  }

  return (
    <div className="inspections-page">
      <div className="page-header">
        <h1>Inspecciones</h1>
        <button className="primary" onClick={() => setShowForm(true)}>+ Registrar Inspección</button>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'external' ? 'active' : ''}
          onClick={() => setActiveTab('external')}
        >
          Inspecciones Externas
        </button>
        <button 
          className={activeTab === 'field' ? 'active' : ''}
          onClick={() => setActiveTab('field')}
        >
          Inspecciones en Obra
        </button>
      </div>

      {activeTab === 'external' && (
        <div className="tab-content">
          <h2>INSPECCIONES EXTERNAS REALIZADAS A LOS EQUIPOS, ELEMENTOS O ACCESORIOS DE IZADO DE CARGAS</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha de inspección</th>
                <th>Fecha de próxima inspección</th>
                <th>Estado de inspección</th>
                <th>Empresa responsable</th>
                <th>Criterio final de la inspección realizada (Certificado)</th>
                <th>No. serial marcación externa (Moneda - Presinto)</th>
                <th>Adjuntar Certificado (PDF)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {externalInspections.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>No hay inspecciones externas registradas</td>
                </tr>
              ) : (
                externalInspections.map((item) => (
                  <tr key={item.id}>
                    <td>{item.inspection_date}</td>
                    <td>{item.next_inspection_date}</td>
                    <td>{item.inspection_status}</td>
                    <td>{item.responsible_company}</td>
                    <td>{item.inspection_criteria}</td>
                    <td>{item.serial_marking}</td>
                    <td>{item.certificate_file ? 'Sí' : '-'}</td>
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
      )}

      {activeTab === 'field' && (
        <div className="tab-content">
          <h2>INSPECCIONES REALIZADAS EN OBRA</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha de inspección</th>
                <th>Criterio final de la inspección realizada</th>
                <th>Responsable de la inspección</th>
                <th>Registro fotográfico de inspección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {fieldInspections.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No hay inspecciones en obra registradas</td>
                </tr>
              ) : (
                fieldInspections.map((item) => (
                  <tr key={item.id}>
                    <td>{item.inspection_date}</td>
                    <td>{item.inspection_criteria}</td>
                    <td>{item.responsible_person}</td>
                    <td>{item.photos ? 'Sí' : '-'}</td>
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
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registrar Inspección</h2>
            
            <div className="form-group">
              <label>Tipo de Inspección</label>
              <select value={inspectionType} onChange={(e) => setInspectionType(e.target.value)}>
                <option value="external">Inspección Externa</option>
                <option value="field">Inspección en Obra</option>
              </select>
            </div>

            <form onSubmit={handleAddInspection}>
              {inspectionType === 'external' ? (
                <>
                  <div className="form-group">
                    <label>Fecha de inspección</label>
                    <input 
                      type="date" 
                      name="inspection_date" 
                      value={externalFormData.inspection_date} 
                      onChange={handleExternalChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de próxima inspección</label>
                    <input 
                      type="date" 
                      name="next_inspection_date" 
                      value={externalFormData.next_inspection_date} 
                      onChange={handleExternalChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado de inspección</label>
                    <select 
                      name="inspection_status" 
                      value={externalFormData.inspection_status} 
                      onChange={handleExternalChange}
                      required
                    >
                      <option value="">Seleccionar estado</option>
                      <option value="Aprobado">Aprobado</option>
                      <option value="Rechazado">Rechazado</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Empresa responsable</label>
                    <input 
                      type="text" 
                      name="responsible_company" 
                      value={externalFormData.responsible_company} 
                      onChange={handleExternalChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Criterio final de la inspección realizada (Certificado)</label>
                    <textarea 
                      name="inspection_criteria" 
                      value={externalFormData.inspection_criteria} 
                      onChange={handleExternalChange}
                      rows="3"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>No. serial marcación externa (Moneda - Presinto)</label>
                    <input 
                      type="text" 
                      name="serial_marking" 
                      value={externalFormData.serial_marking} 
                      onChange={handleExternalChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Adjuntar Certificado (PDF)</label>
                    <input type="file" accept=".pdf" />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Fecha de inspección</label>
                    <input 
                      type="date" 
                      name="inspection_date" 
                      value={fieldFormData.inspection_date} 
                      onChange={handleFieldChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Criterio final de la inspección realizada</label>
                    <textarea 
                      name="inspection_criteria" 
                      value={fieldFormData.inspection_criteria} 
                      onChange={handleFieldChange}
                      rows="3"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Responsable de la inspección</label>
                    <input 
                      type="text" 
                      name="responsible_person" 
                      value={fieldFormData.responsible_person} 
                      onChange={handleFieldChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Registro fotográfico de inspección</label>
                    <input type="file" accept="image/*" />
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="submit" className="primary">Guardar</button>
                <button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
