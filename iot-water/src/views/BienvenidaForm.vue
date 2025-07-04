<template>
  <div class="form-modal">
    <form @submit.prevent="onSubmit">
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
      <div>
        <button type="submit">{{ editando ? 'Editar' : 'Crear' }}</button>
        <button type="button" @click="$emit('cerrar')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { crearBienvenida, editarBienvenida } from '../services/api.js'

const props = defineProps({ editando: Boolean, bienvenidaInicial: Object })
const emit = defineEmits(['guardado', 'cerrar'])

const form = ref({
  historia: '',
  mision: '',
  vision: '',
  celular: '',
  correo: ''
})

watch(() => props.bienvenidaInicial, (nuevo) => {
  if (nuevo) Object.assign(form.value, nuevo)
  else form.value = { historia: '', mision: '', vision: '', celular: '', correo: '' }
}, { immediate: true })

const onSubmit = async () => {
  if (props.editando && props.bienvenidaInicial && props.bienvenidaInicial.id) {
    await editarBienvenida(props.bienvenidaInicial.id, form.value)
  } else {
    await crearBienvenida(form.value)
  }
  emit('guardado')
}
</script>
