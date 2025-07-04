// Datos de ejemplo para medidores
export const mockMedidores = [
  {
    id: 1,
    codigo: 'MED001',
    tipo: 'residencial',
    consumoActual: 125.5,
    estado: 'activo',
    marca: 'Siemens',
    modelo: 'WM-2000',
    fechaLectura: '2024-01-15T10:30:00',
    descripcion: 'Medidor residencial ubicado en zona norte',
    createdAt: '2024-01-01T08:00:00',
    updatedAt: '2024-01-15T10:30:00'
  },
  {
    id: 2,
    codigo: 'MED002',
    tipo: 'comercial',
    consumoActual: 450.75,
    estado: 'mantenimiento',
    marca: 'Honeywell',
    modelo: 'HWM-500',
    fechaLectura: '2024-01-14T15:45:00',
    descripcion: 'Medidor comercial para centro comercial',
    createdAt: '2024-01-02T09:15:00',
    updatedAt: '2024-01-14T15:45:00'
  },
  {
    id: 3,
    codigo: 'MED003',
    tipo: 'industrial',
    consumoActual: 1250.25,
    estado: 'activo',
    marca: 'ABB',
    modelo: 'IM-3000',
    fechaLectura: '2024-01-15T12:00:00',
    descripcion: 'Medidor industrial para fábrica textil',
    createdAt: '2024-01-03T10:30:00',
    updatedAt: '2024-01-15T12:00:00'
  },
  {
    id: 4,
    codigo: 'MED004',
    tipo: 'municipal',
    consumoActual: 0,
    estado: 'inactivo',
    marca: 'Schneider',
    modelo: 'MM-1000',
    fechaLectura: '2024-01-10T08:00:00',
    descripcion: 'Medidor municipal para parque público',
    createdAt: '2024-01-04T11:45:00',
    updatedAt: '2024-01-10T08:00:00'
  },
  {
    id: 5,
    codigo: 'MED005',
    tipo: 'residencial',
    consumoActual: 89.30,
    estado: 'activo',
    marca: 'Siemens',
    modelo: 'WM-1500',
    fechaLectura: '2024-01-15T09:15:00',
    descripcion: 'Medidor residencial zona sur',
    createdAt: '2024-01-05T14:20:00',
    updatedAt: '2024-01-15T09:15:00'
  },
  {
    id: 6,
    codigo: 'MED006',
    tipo: 'comercial',
    consumoActual: 320.45,
    estado: 'activo',
    marca: 'Honeywell',
    modelo: 'HWM-300',
    fechaLectura: '2024-01-15T11:30:00',
    descripcion: 'Medidor comercial para restaurante',
    createdAt: '2024-01-06T16:10:00',
    updatedAt: '2024-01-15T11:30:00'
  }
]

// Función para simular delay de red
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Función para generar ID único
export const generateId = () => Math.max(...mockMedidores.map(m => m.id)) + 1 