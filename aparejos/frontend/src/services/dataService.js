import api from './api'

// Equipment endpoints
export const equipment = {
  list: (skip = 0, limit = 100) => api.get('/equipment', { params: { skip, limit } }),
  get: (id) => api.get(`/equipment/${id}`),
  create: (data) => api.post('/equipment', data),
  update: (id, data) => api.put(`/equipment/${id}`, data),
  delete: (id) => api.delete(`/equipment/${id}`),
}

// Inspection endpoints
export const inspections = {
  listExternal: (skip = 0, limit = 100) => api.get('/inspections/external', { params: { skip, limit } }),
  listField: (skip = 0, limit = 100) => api.get('/inspections/field', { params: { skip, limit } }),
  getByEquipment: (equipmentId) => api.get(`/inspections/equipment/${equipmentId}`),
  createExternal: (data) => api.post('/inspections/external', data),
  createField: (data) => api.post('/inspections/field', data),
}

// Reports endpoints
export const reports = {
  getEquipmentStatus: () => api.get('/reports/equipment-status'),
  getDeincorporation: () => api.get('/reports/deincorporation'),
  exportPdf: (reportType) => api.get('/reports/export-pdf', { params: { report_type: reportType } }),
  exportCsv: (reportType) => api.get('/reports/export-csv', { params: { report_type: reportType } }),
}

// Audit endpoints
export const audit = {
  getAll: (entityType = null, entityId = null) => 
    api.get('/audit/logs', { params: { entity_type: entityType, entity_id: entityId } }),
  getEquipmentTrail: (equipmentId) => api.get(`/audit/equipment/${equipmentId}`),
  getUserActions: (userId) => api.get(`/audit/user/${userId}`),
}

// Auth endpoints
export const auth = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (data) => api.post('/auth/register', data),
}

// Users endpoints
export const users = {
  list: (skip = 0, limit = 100) => api.get('/users', { params: { skip, limit } }),
  get: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
}

export default { equipment, inspections, reports, audit, auth, users }
