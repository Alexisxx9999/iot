<template>
  <div class="form-container">
    <h1>Editar Bienvenida</h1>
    <form @submit.prevent="onSubmit">
      <label>Nombre</label>
      <input v-model="form.nombre" required />

      <label>Descripción</label>
      <textarea v-model="form.descripcion" required />

      <label>Estado</label>
      <input v-model="form.estado" required />

      <label>Historia</label>
      <textarea v-model="form.historia" required />
      <label>Misión</label>
      <textarea v-model="form.mision" required />
      <label>Visión</label>
      <textarea v-model="form.vision" required />
      <label>Celular</label>
      <input v-model="form.celular" required />
      <label>Correo</label>
      <input v-model="form.correo" type="email" required />
      <div class="form-actions">
        <button type="submit">Guardar</button>
        <router-link to="/" class="btn-cancelar">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Datos quemados (mock) con los nuevos campos
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
  // Aquí podrías guardar en localStorage o mostrar un mensaje de éxito
  alert('¡Datos guardados (simulado)!')
  router.push('/')
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 40px auto;
  background: #222;
  color: #fff;
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: 0 4px 24px #0003;
}
h1 {
  text-align: center;
  margin-bottom: 32px;
}
label {
  display: block;
  margin-top: 18px;
  margin-bottom: 6px;
  font-weight: bold;
}
input, textarea {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: none;
  margin-bottom: 8px;
  background: #333;
  color: #fff;
  font-size: 1rem;
}
textarea {
  min-height: 60px;
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
</style>
