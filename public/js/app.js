// // Mock in-memory data (simulate loaded from backend or Freemarker)
// let employees = JSON.parse(localStorage.getItem("employees") || "[]");

// // On page load, attach listeners
// window.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("employeeForm");

//   if (form) {
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       handleFormSubmit();
//     });
//   }
// });

// function handleFormSubmit() {
//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const department = document.getElementById("department").value.trim();
//   const role = document.getElementById("role").value.trim();

//   // Basic validation
//   if (!firstName || !lastName || !email || !department || !role) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   if (!validateEmail(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   // Simulate add (we'll support edit later)
//   const newEmployee = {
//     id: Date.now(),
//     firstName,
//     lastName,
//     email,
//     department,
//     role,
//   };

//   employees.push(newEmployee);
//   localStorage.setItem("employees", JSON.stringify(employees));

//   alert("Employee saved successfully!");
//   window.location.href = "index.html"; // Go back to dashboard
// }

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

let employees = JSON.parse(localStorage.getItem("employees") || "[]");

window.addEventListener("DOMContentLoaded", () => {
  renderEmployeeDashboard();
  attachFormHandler();
  prefillFormIfEditing();
});

function renderEmployeeDashboard() {
  const container = document.getElementById("employeeContainer");
  if (!container) return;

  employees = JSON.parse(localStorage.getItem("employees") || "[]");

  if (employees.length === 0) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }

  container.innerHTML = employees.map(emp => `
    <div class="employee-card">
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="button-group">
        <button class="edit-btn" onclick="startEdit(${emp.id})">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    </div>
  `).join("");
}

function attachFormHandler() {
  const form = document.getElementById("employeeForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const editingId = localStorage.getItem("editingId");
    handleFormSubmit(editingId);
  });
}

function handleFormSubmit(editingId) {
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

  employees = JSON.parse(localStorage.getItem("employees") || "[]");

  if (editingId) {
    // Edit existing
    const index = employees.findIndex(emp => emp.id == editingId);
    if (index > -1) {
      employees[index] = { id: parseInt(editingId), firstName, lastName, email, department, role };
    }
    localStorage.removeItem("editingId");
  } else {
    // New employee
    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      department,
      role,
    };
    employees.push(newEmployee);
  }

  localStorage.setItem("employees", JSON.stringify(employees));
  alert("Employee saved!");
  window.location.href = "/";
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function startEdit(id) {
  localStorage.setItem("editingId", id);
  window.location.href = "/form.html";
}

function prefillFormIfEditing() {
  const editingId = localStorage.getItem("editingId");
  if (!editingId) return;

  employees = JSON.parse(localStorage.getItem("employees") || "[]");
  const emp = employees.find(e => e.id == editingId);
  if (!emp) return;

  // Prefill values
  document.getElementById("firstName").value = emp.firstName;
  document.getElementById("lastName").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;
}

function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  employees = employees.filter(emp => emp.id !== id);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployeeDashboard();
}

