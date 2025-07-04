import axios from 'axios'
import { handleError, showNotification } from '../utils/errorHandler'

// Configuración de axios
const API_BASE_URL = 'http://localhost:3000/api' // Cambiar por tu URL del backend

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = handleError(error, 'API Request')
    showNotification(errorMessage, 'error')
    return Promise.reject(error)
  }
)

// Función para generar mensaje de mantenimiento según el estado
const generarMensajeMantenimiento = (estado) => {
  switch (estado) {
    case 'activo':
      return null
    case 'mantenimiento':
      return 'Medidor en mantenimiento programado - Lecturas temporales no disponibles'
    case 'inactivo':
      return 'Medidor fuera de servicio - Requiere revisión técnica'
    default:
      return null
  }
}

// Datos mock para desarrollo (cuando no hay backend)
let mockMedidores = [
  {
    id: 1,
    codigo: 'MED001',
    tipo: 'residencial',
    consumoActual: 150.5,
    estado: 'activo',
    marca: 'Siemens',
    modelo: 'SITRANS F',
    fechaLectura: '2024-01-15T10:30:00Z',
    mensajeMantenimiento: generarMensajeMantenimiento('activo'),
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    codigo: 'MED002',
    tipo: 'comercial',
    consumoActual: 450.2,
    estado: 'activo',
    marca: 'Endress+Hauser',
    modelo: 'Promag 50',
    fechaLectura: '2024-01-15T09:45:00Z',
    mensajeMantenimiento: generarMensajeMantenimiento('activo'),
    createdAt: '2024-01-02T09:15:00Z',
    updatedAt: '2024-01-15T09:45:00Z'
  },
  {
    id: 3,
    codigo: 'MED003',
    tipo: 'industrial',
    consumoActual: 1200.8,
    estado: 'mantenimiento',
    marca: 'ABB',
    modelo: 'AquaMaster',
    fechaLectura: '2024-01-14T16:20:00Z',
    mensajeMantenimiento: generarMensajeMantenimiento('mantenimiento'),
    createdAt: '2024-01-03T10:30:00Z',
    updatedAt: '2024-01-14T16:20:00Z'
  },
  {
    id: 4,
    codigo: 'MED004',
    tipo: 'municipal',
    consumoActual: 0,
    estado: 'inactivo',
    marca: 'Krohne',
    modelo: 'Altosonic 5',
    fechaLectura: '2024-01-10T08:15:00Z',
    mensajeMantenimiento: generarMensajeMantenimiento('inactivo'),
    createdAt: '2024-01-04T11:45:00Z',
    updatedAt: '2024-01-10T08:15:00Z'
  },
  {
    id: 5,
    codigo: 'MED005',
    tipo: 'residencial',
    consumoActual: 75.3,
    estado: 'activo',
    marca: 'Siemens',
    modelo: 'SITRANS F',
    fechaLectura: '2024-01-15T11:00:00Z',
    mensajeMantenimiento: generarMensajeMantenimiento('activo'),
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  }
]

// Variable para controlar si usar datos mock o API real
const USE_MOCK_DATA = true // Cambiar a false cuando tengas backend

class MedidorService {
  // Obtener todos los medidores
  async getAllMedidores() {
    try {
      if (USE_MOCK_DATA) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500))
        return [...mockMedidores]
      }
      
      const response = await api.get('/medidores')
      return response.data
    } catch (error) {
      console.error('Error al obtener medidores:', error)
      throw error
    }
  }

  // Obtener un medidor por ID
  async getMedidorById(id) {
    try {
      console.log('getMedidorById llamado con ID:', id, 'tipo:', typeof id)
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const idNum = parseInt(id)
        console.log('ID convertido a número:', idNum)
        console.log('Medidores disponibles:', mockMedidores.map(m => ({ id: m.id, codigo: m.codigo })))
        const medidor = mockMedidores.find(m => m.id === idNum)
        console.log('Medidor encontrado:', medidor)
        if (!medidor) {
          throw new Error('Medidor no encontrado')
        }
        return medidor
      }
      
      const response = await api.get(`/medidores/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener medidor ${id}:`, error)
      throw error
    }
  }

  // Crear un nuevo medidor
  async createMedidor(medidorData) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Validar datos requeridos
        if (!medidorData.codigo || !medidorData.tipo) {
          throw new Error('Código y tipo son campos requeridos')
        }
        
        // Verificar si el código ya existe
        const codigoExiste = mockMedidores.some(m => m.codigo === medidorData.codigo)
        if (codigoExiste) {
          throw new Error('Ya existe un medidor con ese código')
        }
        
        const nuevoMedidor = {
          id: Math.max(...mockMedidores.map(m => m.id)) + 1,
          codigo: medidorData.codigo,
          tipo: medidorData.tipo,
          consumoActual: medidorData.consumoActual || 0,
          estado: medidorData.estado || 'activo',
          marca: medidorData.marca || '',
          modelo: medidorData.modelo || '',
          fechaLectura: new Date().toISOString(),
          mensajeMantenimiento: generarMensajeMantenimiento(medidorData.estado || 'activo'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        mockMedidores.push(nuevoMedidor)
        showNotification('Medidor creado exitosamente', 'success')
        return nuevoMedidor
      }
      
      const response = await api.post('/medidores', medidorData)
      showNotification('Medidor creado exitosamente', 'success')
      return response.data
    } catch (error) {
      console.error('Error al crear medidor:', error)
      throw error
    }
  }

  // Actualizar un medidor existente
  async updateMedidor(id, medidorData) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const index = mockMedidores.findIndex(m => m.id === parseInt(id))
        if (index === -1) {
          throw new Error('Medidor no encontrado')
        }
        
        // Verificar si el código ya existe en otro medidor
        const codigoExiste = mockMedidores.some(m => 
          m.codigo === medidorData.codigo && m.id !== parseInt(id)
        )
        if (codigoExiste) {
          throw new Error('Ya existe un medidor con ese código')
        }
        
        const medidorActualizado = {
          ...mockMedidores[index],
          ...medidorData,
          id: parseInt(id),
          fechaLectura: new Date().toISOString(),
          mensajeMantenimiento: generarMensajeMantenimiento(medidorData.estado || mockMedidores[index].estado),
          updatedAt: new Date().toISOString()
        }
        
        mockMedidores[index] = medidorActualizado
        showNotification('Medidor actualizado exitosamente', 'success')
        return medidorActualizado
      }
      
      const response = await api.put(`/medidores/${id}`, medidorData)
      showNotification('Medidor actualizado exitosamente', 'success')
      return response.data
    } catch (error) {
      console.error(`Error al actualizar medidor ${id}:`, error)
      throw error
    }
  }

  // Eliminar un medidor
  async deleteMedidor(id) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 400))
        
        const index = mockMedidores.findIndex(m => m.id === parseInt(id))
        if (index === -1) {
          throw new Error('Medidor no encontrado')
        }
        
        const medidorEliminado = mockMedidores.splice(index, 1)[0]
        showNotification('Medidor eliminado exitosamente', 'success')
        return medidorEliminado
      }
      
      const response = await api.delete(`/medidores/${id}`)
      showNotification('Medidor eliminado exitosamente', 'success')
      return response.data
    } catch (error) {
      console.error(`Error al eliminar medidor ${id}:`, error)
      throw error
    }
  }

  // Buscar medidores por criterios
  async searchMedidores(criterios) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        let resultados = [...mockMedidores]
        
        if (criterios.codigo) {
          resultados = resultados.filter(m => 
            m.codigo.toLowerCase().includes(criterios.codigo.toLowerCase())
          )
        }
        
        if (criterios.tipo) {
          resultados = resultados.filter(m => m.tipo === criterios.tipo)
        }
        
        if (criterios.estado) {
          resultados = resultados.filter(m => m.estado === criterios.estado)
        }
        
        if (criterios.marca) {
          resultados = resultados.filter(m => 
            m.marca.toLowerCase().includes(criterios.marca.toLowerCase())
          )
        }
        
        return resultados
      }
      
      const response = await api.get('/medidores/search', { params: criterios })
      return response.data
    } catch (error) {
      console.error('Error al buscar medidores:', error)
      throw error
    }
  }

  // Obtener estadísticas
  async getEstadisticas() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const total = mockMedidores.length
        const activos = mockMedidores.filter(m => m.estado === 'activo').length
        const mantenimiento = mockMedidores.filter(m => m.estado === 'mantenimiento').length
        const inactivos = mockMedidores.filter(m => m.estado === 'inactivo').length
        const consumoTotal = mockMedidores.reduce((sum, m) => sum + m.consumoActual, 0)
        
        return {
          totalMedidores: total,
          medidoresActivos: activos,
          medidoresMantenimiento: mantenimiento,
          medidoresInactivos: inactivos,
          consumoTotal
        }
      }
      
      const response = await api.get('/medidores/estadisticas')
      return response.data
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw error
    }
  }

  // Obtener tipos de medidores disponibles
  getTiposMedidores() {
    return [
      { value: 'residencial', label: 'Residencial' },
      { value: 'comercial', label: 'Comercial' },
      { value: 'industrial', label: 'Industrial' },
      { value: 'municipal', label: 'Municipal' }
    ]
  }

  // Obtener estados disponibles
  getEstadosMedidores() {
    return [
      { value: 'activo', label: 'Activo' },
      { value: 'mantenimiento', label: 'En Mantenimiento' },
      { value: 'inactivo', label: 'Inactivo' }
    ]
  }
}

export default new MedidorService() 