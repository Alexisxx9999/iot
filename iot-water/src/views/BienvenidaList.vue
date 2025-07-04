<template>
  <div class="bienvenida-container">
    <h1>Página de Bienvenida</h1>
    <section>
      <h2>Nombre</h2>
      <p>{{ bienvenida.nombre }}</p>
    </section>
    <section>
      <h2>Descripción</h2>
      <p>{{ bienvenida.descripcion }}</p>
    </section>
    <section>
      <h2>Estado</h2>
      <p>{{ bienvenida.estado }}</p>
    </section>
    <section>
      <h2>Historia</h2>
      <p>{{ bienvenida.historia }}</p>
    </section>
    <section>
      <h2>Misión</h2>
      <p>{{ bienvenida.mision }}</p>
    </section>
    <section>
      <h2>Visión</h2>
      <p>{{ bienvenida.vision }}</p>
    </section>
    <section>
      <h2>Información de contacto</h2>
      <p><b>Celular:</b> {{ bienvenida.celular }}</p>
      <p><b>Correo:</b> {{ bienvenida.correo }}</p>
    </section>
    <router-link to="/admin" class="btn-editar">Editar</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Datos quemados (mock) con los nuevos campos
const bienvenida = ref({
  nombre: "ProfeGo",
  descripcion: "Plataforma educativa innovadora.",
  estado: "Activo",
  historia: "ProfeGo nace para atender la demanda de padres de familia y profesionales que buscan fortalecer procesos de enseñanza y aprendizaje...",
  mision: "Nuestra misión es conectar a estudiantes con docentes y coaches especialistas...",
  vision: "Convertirse en la plataforma líder personalizada...",
  celular: "0962900677",
  correo: "educonecta2@gmail.com"
})
</script>

<style scoped>
.bienvenida-container {
  max-width: 700px;
  margin: 40px auto;
  background: #222;
  color: #fff;
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: 0 4px 24px #0003;
  text-align: center;
}
section {
  margin-bottom: 32px;
}
h1 {
  margin-bottom: 32px;
  font-size: 2.5rem;
  font-weight: bold;
}
h2 {
  margin-bottom: 8px;
  font-size: 1.3rem;
  font-weight: bold;
}
.btn-editar {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 32px;
  background: #ff9800;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: background 0.2s;
}
.btn-editar:hover {
  background: #e65100;
}
</style>
