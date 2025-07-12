// public/js/formHandler.js
import {
  getEditingId,
  clearEditingId,
  saveEmployees
} from './data.js';

export function attachFormHandler(employees) {
  const form = document.getElementById("employeeForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(employees);
  });
}

export function prefillFormIfEditing(employees) {
  const editingId = getEditingId();
  if (!editingId) return;

  const emp = employees.find(e => e.id == editingId);
  if (!emp) return;

  // Prefill form fields
  document.getElementById("firstName").value = emp.firstName;
  document.getElementById("lastName").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;
}

function handleFormSubmit(employees) {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value.trim();
  const role = document.getElementById("role").value.trim();

  if (!firstName || !lastName || !email || !department || !role) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const editingId = getEditingId();

  if (editingId) {
    // Edit existing employee
    const index = employees.findIndex(emp => emp.id == editingId);
    if (index > -1) {
      employees[index] = { id: parseInt(editingId), firstName, lastName, email, department, role };
    }
    clearEditingId();
  } else {
    // Add new employee
    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      department,
      role
    };
    employees.push(newEmployee);
  }

  saveEmployees(employees);
  alert("Employee saved successfully!");
  window.location.href = "index.html"; // Go back to dashboard
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
