// Servicio para manejar las operaciones CRUD de nodos
// En una aplicación real, esto se conectaría con una API

// Datos simulados - en producción esto vendría de una base de datos
let nodes = [
  {
    id: 1,
    codigo: 'NODO-001',
    tipo: 'Sensor de Temperatura',
    fechaInstalacion: '2024-01-15',
    bateria: 85,
    descripcion: 'Sensor ubicado en el invernadero principal'
  },
  {
    id: 2,
    codigo: 'NODO-002',
    tipo: 'Sensor de Humedad',
    fechaInstalacion: '2024-02-20',
    bateria: 92,
    descripcion: 'Sensor de humedad del suelo'
  },
  {
    id: 3,
    codigo: 'NODO-003',
    tipo: 'Actuador de Riego',
    fechaInstalacion: '2024-03-10',
    bateria: 67,
    descripcion: 'Controlador del sistema de riego automático'
  }
]

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const nodeService = {
  // Obtener todos los nodos
  async getAllNodes() {
    await delay(500) // Simular tiempo de respuesta
    return [...nodes]
  },

  // Obtener un nodo por ID
  async getNodeById(id) {
    await delay(300)
    return nodes.find(node => node.id === parseInt(id))
  },

  // Crear un nuevo nodo
  async createNode(nodeData) {
    await delay(800)
    const newNode = {
      id: Date.now(),
      ...nodeData
    }
    nodes.push(newNode)
    return newNode
  },

  // Actualizar un nodo existente
  async updateNode(id, nodeData) {
    await delay(600)
    const index = nodes.findIndex(node => node.id === parseInt(id))
    if (index !== -1) {
      nodes[index] = { ...nodes[index], ...nodeData }
      return nodes[index]
    }
    throw new Error('Nodo no encontrado')
  },

  // Eliminar un nodo
  async deleteNode(id) {
    await delay(400)
    const index = nodes.findIndex(node => node.id === parseInt(id))
    if (index !== -1) {
      const deletedNode = nodes[index]
      nodes.splice(index, 1)
      return deletedNode
    }
    throw new Error('Nodo no encontrado')
  },

  // Generar código único para nodo
  generateNodeCode() {
    const existingCodes = nodes.map(node => node.codigo)
    let counter = 1
    let newCode = `NODO-${counter.toString().padStart(3, '0')}`
    
    while (existingCodes.includes(newCode)) {
      counter++
      newCode = `NODO-${counter.toString().padStart(3, '0')}`
    }
    
    return newCode
  }
} 