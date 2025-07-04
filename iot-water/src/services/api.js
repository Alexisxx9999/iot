const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Cambia esto cuando tengas la URL real

export async function obtenerBienvenida() {
  const response = await fetch(`${API_BASE_URL}/bienvenida`);
  return response.json();
}

export async function crearBienvenida(data) {
  const response = await fetch(`${API_BASE_URL}/bienvenida`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function editarBienvenida(id, data) {
  const response = await fetch(`${API_BASE_URL}/bienvenida/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
