// Handles loading and saving employees from/to localStorage

export function loadEmployees() {
  return JSON.parse(localStorage.getItem("employees") || "[]");
}

export function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

export function getEditingId() {
  return localStorage.getItem("editingId");
}

export function setEditingId(id) {
  localStorage.setItem("editingId", id);
}

export function clearEditingId() {
  localStorage.removeItem("editingId");
}
