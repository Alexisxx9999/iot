<template>
  <div class="admin-layout">
    <!-- Panel de edición -->
    <div class="admin-form">
      <h2>Editar Bienvenida</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="form.nombre" required />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea v-model="form.descripcion" required />
        </div>
        <div class="form-group">
          <label>Estado</label>
          <select v-model="form.estado" required>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div class="form-group">
          <label>Historia</label>
          <textarea v-model="form.historia" required />
        </div>
        <div class="form-group">
          <label>Misión</label>
          <textarea v-model="form.mision" required />
        </div>
        <div class="form-group">
          <label>Visión</label>
          <textarea v-model="form.vision" required />
        </div>
        <div class="form-group">
          <label>Celular</label>
          <input v-model="form.celular" required />
        </div>
        <div class="form-group">
          <label>Correo</label>
          <input v-model="form.correo" type="email" required />
        </div>
        <div class="form-actions">
          <button type="submit">Guardar</button>
          <router-link to="/" class="btn-cancelar">Cancelar</router-link>
        </div>
      </form>
    </div>

    <!-- Panel de vista previa -->
    <div class="admin-preview">
      <h2>Vista previa</h2>
      <div class="preview-container">
        <h1>{{ form.nombre }}</h1>
        <p><i>{{ form.descripcion }}</i></p>
        <p v-if="form.estado === 'Inactivo'" class="estado-inactivo">[No visible para clientes]</p>
        <section>
          <h3>Historia</h3>
          <p>{{ form.historia }}</p>
        </section>
        <section>
          <h3>Misión</h3>
          <p>{{ form.mision }}</p>
        </section>
        <section>
          <h3>Visión</h3>
          <p>{{ form.vision }}</p>
        </section>
        <section>
          <h3>Información de contacto</h3>
          <p><b>Celular:</b> {{ form.celular }}</p>
          <p><b>Correo:</b> {{ form.correo }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  nombre: "ProfeGo",
  descripcion: "Plataforma educativa innovadora.",
  estado: "Activo",
  historia: "ProfeGo nace para atender la demanda de padres de familia y profesionales que buscan fortalecer procesos de enseñanza y aprendizaje...",
  mision: "Nuestra misión es conectar a estudiantes con docentes y coaches especialistas...",
  vision: "Convertirse en la plataforma líder personalizada...",
  celular: "0962900677",
  correo: "educonecta2@gmail.com"
})

const onSubmit = () => {
  alert('¡Datos guardados (simulado)!');
  router.push('/');
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 40px auto;
  align-items: flex-start;
}
.admin-form, .admin-preview {
  flex: 1;
  background: #222;
  color: #fff;
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: 0 4px 24px #0003;
}
.admin-form {
  min-width: 350px;
}
.admin-preview {
  min-width: 350px;
}
.form-group {
  margin-bottom: 18px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}
input, textarea, select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: none;
  margin-bottom: 4px;
  background: #333;
  color: #fff;
  font-size: 1rem;
}
textarea {
  min-height: 50px;
  resize: vertical;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button, .btn-cancelar {
  padding: 10px 28px;
  border-radius: 8px;
  border: none;
  background: #ff9800;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}
button:hover, .btn-cancelar:hover {
  background: #e65100;
}
.preview-container {
  background: #181818;
  border-radius: 12px;
  padding: 24px;
  margin-top: 12px;
  text-align: center;
}
.estado-inactivo {
  color: #ff9800;
  font-weight: bold;
  margin-bottom: 12px;
}
</style> 