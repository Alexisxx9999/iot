<template>
  <div class="node-list">
    <div class="header">
      <h1>Lista de Nodos IoT</h1>
      <router-link to="/nodes/create" class="btn-create">
        <span>+</span> Crear Nuevo Nodo
      </router-link>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando nodos...</p>
    </div>

    <div class="nodes-grid" v-else-if="nodes.length > 0">
      <div class="node-card" v-for="node in nodes" :key="node.id">
        <div class="node-header">
          <h3>Nodo {{ node.codigo }}</h3>
          <div class="actions">
            <router-link :to="`/nodes/update/${node.id}`" class="btn-edit">
              Editar
            </router-link>
            <button @click="deleteNode(node.id)" class="btn-delete">
              Eliminar
            </button>
            <button 
              v-if="node.activo"
              @click="deactivateNode(node.id)" 
              class="btn-deactivate"
            >
              Desactivar
            </button>
            <button 
              v-else
              @click="activateNode(node.id)" 
              class="btn-activate"
            >
              Reactivar
            </button>
          </div>
        </div>
        
        <div class="node-info">
          <div class="info-item">
            <span class="label">Código:</span>
            <span class="value">{{ node.codigo }}</span>
          </div>
          <div class="info-item">
            <span class="label">Tipo:</span>
            <span class="value">{{ node.tipo }}</span>
          </div>
          <div class="info-item">
            <span class="label">Fecha de Instalación:</span>
            <span class="value">{{ formatDate(node.fechaInstalacion) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Batería:</span>
            <div class="battery-indicator">
              <div class="battery-level" :style="{ width: node.bateria + '%' }"></div>
              <span class="battery-text">{{ node.bateria }}%</span>
            </div>
          </div>
          <div class="info-item">
            <span class="label">Estado:</span>
            <span class="value" :class="{ 'inactive': !node.activo }">{{ node.activo ? 'Activo' : 'Inactivo' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else-if="!loading">
      <div class="empty-icon">📡</div>
      <h3>No hay nodos registrados</h3>
      <p>Crea tu primer nodo IoT para comenzar</p>
      <router-link to="/nodes/create" class="btn-create">
        Crear Primer Nodo
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { nodeService } from '../services/nodeService'

const nodes = ref([])
const loading = ref(true)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const deleteNode = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este nodo?')) {
    try {
      await nodeService.deleteNode(id)
      nodes.value = nodes.value.filter(node => node.id !== id)
    } catch (error) {
      console.error('Error al eliminar nodo:', error)
      alert('Error al eliminar el nodo. Inténtalo de nuevo.')
    }
  }
}

const deactivateNode = async (id) => {
  if (confirm('¿Estás seguro de que quieres desactivar este nodo?')) {
    try {
      await nodeService.deactivateNode(id)
      const idx = nodes.value.findIndex(node => node.id === id)
      if (idx !== -1) nodes.value[idx] = { ...nodes.value[idx], activo: false }
    } catch (error) {
      console.error('Error al desactivar nodo:', error)
      alert('Error al desactivar el nodo. Inténtalo de nuevo.')
    }
  }
}

const activateNode = async (id) => {
  if (confirm('¿Quieres reactivar este nodo?')) {
    try {
      await nodeService.activateNode(id)
      const idx = nodes.value.findIndex(node => node.id === id)
      if (idx !== -1) nodes.value[idx] = { ...nodes.value[idx], activo: true }
    } catch (error) {
      console.error('Error al reactivar nodo:', error)
      alert('Error al reactivar el nodo. Inténtalo de nuevo.')
    }
  }
}

const loadNodes = async () => {
  try {
    loading.value = true
    nodes.value = await nodeService.getAllNodes()
  } catch (error) {
    console.error('Error al cargar nodos:', error)
    alert('Error al cargar los nodos.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadNodes()
})
</script>

<style scoped>
.node-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin: 0;
}

.btn-create {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;
}

.btn-create:hover {
  transform: translateY(-2px);
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.node-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.2s, box-shadow 0.2s;
}

.node-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e5e9;
}

.node-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-delete {
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-edit {
  background: #3498db;
  color: white;
}

.btn-edit:hover {
  background: #2980b9;
}

.btn-delete {
  background: #e74c3c;
  color: white;
}

.btn-delete:hover {
  background: #c0392b;
}

.btn-deactivate {
  background: #f39c12;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.2s;
}
.btn-deactivate:disabled {
  background: #e1e5e9;
  color: #bdc3c7;
  cursor: not-allowed;
}

.btn-activate {
  background: #27ae60;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.2s;
}
.btn-activate:hover {
  background: #219150;
}

.node-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.9em;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

.value.inactive {
  color: #e74c3c;
  font-weight: bold;
}

.battery-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ecf0f1;
  border-radius: 12px;
  padding: 4px 8px;
  min-width: 80px;
}

.battery-level {
  height: 8px;
  background: linear-gradient(90deg, #e74c3c 0%, #f39c12 50%, #27ae60 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.battery-text {
  font-size: 0.8em;
  font-weight: 600;
  color: #2c3e50;
}

.loading, .empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e1e5e9;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 4em;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.empty-state p {
  margin: 0 0 30px 0;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .nodes-grid {
    grid-template-columns: 1fr;
  }
  
  .node-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style> 