import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/nodos'

// Datos mock locales
let mockNodes = [
  {
    id: 1,
    codigo: 'NODO-001',
    tipo: 'Sensor de Temperatura',
    fechaInstalacion: '2024-01-15',
    bateria: 85,
    activo: true
  },
  {
    id: 2,
    codigo: 'NODO-002',
    tipo: 'Sensor de Humedad',
    fechaInstalacion: '2024-02-20',
    bateria: 92,
    activo: true
  },
  {
    id: 3,
    codigo: 'NODO-003',
    tipo: 'Actuador de Riego',
    fechaInstalacion: '2024-03-10',
    bateria: 67,
    activo: true
  }
]

export const nodeService = {
  // Obtener todos los nodos
  async getAllNodes() {
    try {
      const response = await axios.get(API_URL)
      return response.data
    } catch (error) {
      // Fallback a mock instantáneo
      return mockNodes.slice()
    }
  },

  // Obtener un nodo por ID
  async getNodeById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      // Mock instantáneo
      return mockNodes.find(node => node.id === parseInt(id)) || null
    }
  },

  // Crear un nuevo nodo
  async createNode(nodeData) {
    try {
      const response = await axios.post(API_URL, nodeData)
      return response.data
    } catch (error) {
      // Mock instantáneo
      const newNode = {
        id: Date.now(),
        ...nodeData
      }
      mockNodes.push(newNode)
      return newNode
    }
  },

  // Actualizar un nodo existente
  async updateNode(id, nodeData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, nodeData)
      return response.data
    } catch (error) {
      // Mock instantáneo
      const idx = mockNodes.findIndex(node => node.id === parseInt(id))
      if (idx !== -1) {
        mockNodes[idx] = { ...mockNodes[idx], ...nodeData }
        return mockNodes[idx]
      }
      return null
    }
  },

  // Desactivar un nodo (cambiar activo a false)
  async deactivateNode(id) {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { activo: false })
      return response.data
    } catch (error) {
      // Mock instantáneo
      const idx = mockNodes.findIndex(node => node.id === parseInt(id))
      if (idx !== -1) {
        mockNodes[idx].activo = false
        return mockNodes[idx]
      }
      return null
    }
  },

  // Activar un nodo (cambiar activo a true)
  async activateNode(id) {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { activo: true })
      return response.data
    } catch (error) {
      // Mock instantáneo
      const idx = mockNodes.findIndex(node => node.id === parseInt(id))
      if (idx !== -1) {
        mockNodes[idx].activo = true
        return mockNodes[idx]
      }
      return null
    }
  },

  // Generar código único para nodo (esto debería hacerlo el backend en producción)
  generateNodeCode() {
    // Si hay backend, lo ideal es que el backend genere el código
    // Aquí solo para mock
    const existingCodes = mockNodes.map(node => node.codigo)
    let counter = 1
    let newCode = `NODO-${counter.toString().padStart(3, '0')}`
    while (existingCodes.includes(newCode)) {
      counter++
      newCode = `NODO-${counter.toString().padStart(3, '0')}`
    }
    return newCode
  },

  // Eliminar un nodo
  async deleteNode(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      // Mock instantáneo
      const idx = mockNodes.findIndex(node => node.id === parseInt(id))
      if (idx !== -1) {
        const deleted = mockNodes[idx]
        mockNodes.splice(idx, 1)
        return deleted
      }
      return null
    }
  }
} 