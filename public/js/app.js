// let employees = JSON.parse(localStorage.getItem("employees") || "[]");

// let pagination = {
//   currentPage: 1,
//   itemsPerPage: 10
// };

// window.addEventListener("DOMContentLoaded", () => {
//   renderEmployeeDashboard();
//   attachFormHandler();
//   prefillFormIfEditing();

//   document.getElementById("itemsPerPage")?.addEventListener("change", (e) => {
//   pagination.itemsPerPage = parseInt(e.target.value);
//   pagination.currentPage = 1;
//   renderEmployeeDashboard();
// });

// document.getElementById("prevPage")?.addEventListener("click", () => {
//   if (pagination.currentPage > 1) {
//     pagination.currentPage--;
//     renderEmployeeDashboard();
//   }
// });

// document.getElementById("nextPage")?.addEventListener("click", () => {
//   pagination.currentPage++;
//   renderEmployeeDashboard();
// });

// });

// let filters = {
//   search: "",
//   sortBy: "",
//   filterFirstName: "",
//   filterDepartment: "",
//   filterRole: ""
// };

// document.getElementById("searchInput")?.addEventListener("input", (e) => {
//   filters.search = e.target.value.toLowerCase();
//   renderEmployeeDashboard();
// });

// document.getElementById("sortSelect")?.addEventListener("change", (e) => {
//   filters.sortBy = e.target.value;
//   renderEmployeeDashboard();
// });

// document.getElementById("filterToggleBtn")?.addEventListener("click", () => {
//   document.getElementById("filterPanel").classList.toggle("hidden");
// });

// document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
//   filters.filterFirstName = document.getElementById("filterFirstName").value.toLowerCase();
//   filters.filterDepartment = document.getElementById("filterDepartment").value.toLowerCase();
//   filters.filterRole = document.getElementById("filterRole").value.toLowerCase();
//   renderEmployeeDashboard();
// });

// document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
//   filters = { search: "", sortBy: "", filterFirstName: "", filterDepartment: "", filterRole: "" };
//   document.getElementById("searchInput").value = "";
//   document.getElementById("sortSelect").value = "";
//   document.getElementById("filterFirstName").value = "";
//   document.getElementById("filterDepartment").value = "";
//   document.getElementById("filterRole").value = "";
//   renderEmployeeDashboard();
// });

// function renderEmployeeDashboard() {
//   const container = document.getElementById("employeeContainer");
//   if (!container) return;

//   let employees = JSON.parse(localStorage.getItem("employees") || "[]");

//   // Search
//   if (filters.search) {
//     employees = employees.filter(emp =>
//       (emp.firstName + " " + emp.lastName).toLowerCase().includes(filters.search) ||
//       emp.email.toLowerCase().includes(filters.search)
//     );
//   }

//   // Filter
//   if (filters.filterFirstName) {
//     employees = employees.filter(emp =>
//       emp.firstName.toLowerCase().includes(filters.filterFirstName)
//     );
//   }
//   if (filters.filterDepartment) {
//     employees = employees.filter(emp =>
//       emp.department.toLowerCase().includes(filters.filterDepartment)
//     );
//   }
//   if (filters.filterRole) {
//     employees = employees.filter(emp =>
//       emp.role.toLowerCase().includes(filters.filterRole)
//     );
//   }

//   // Sort
//   if (filters.sortBy) {
//     const [field, order] = filters.sortBy.split("-");
//     employees.sort((a, b) => {
//       const valA = a[field].toLowerCase();
//       const valB = b[field].toLowerCase();
//       return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
//     });
//   }

//   const totalEmployees = employees.length;
//   const totalPages = Math.ceil(totalEmployees / pagination.itemsPerPage);

//   // Ensure current page stays in bounds
//   pagination.currentPage = Math.min(pagination.currentPage, totalPages || 1);

//   const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
//   const endIndex = startIndex + pagination.itemsPerPage;
//   const employeesToShow = employees.slice(startIndex, endIndex);


//   // Render
//   if (employees.length === 0) {
//     container.innerHTML = "<p>No employees found.</p>";
//     return;
//   }

//   container.innerHTML = employeesToShow.map(emp => `
//   <div class="employee-card">
//     <h3>${emp.firstName} ${emp.lastName}</h3>
//     <p><strong>Email:</strong> ${emp.email}</p>
//     <p><strong>Department:</strong> ${emp.department}</p>
//     <p><strong>Role:</strong> ${emp.role}</p>
//     <div class="button-group">
//       <button class="edit-btn" onclick="startEdit(${emp.id})">Edit</button>
//       <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
//     </div>
//   </div>
// `).join("");

// // Update page indicator
// document.getElementById("pageIndicator").textContent =
//   `Page ${pagination.currentPage} of ${totalPages || 1}`;
// }

// function attachFormHandler() {
//   const form = document.getElementById("employeeForm");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const editingId = localStorage.getItem("editingId");
//     handleFormSubmit(editingId);
//   });
// }

// function handleFormSubmit(editingId) {
//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const department = document.getElementById("department").value.trim();
//   const role = document.getElementById("role").value.trim();

//   if (!firstName || !lastName || !email || !department || !role) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   if (!validateEmail(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   employees = JSON.parse(localStorage.getItem("employees") || "[]");

//   if (editingId) {
//     // Edit existing
//     const index = employees.findIndex(emp => emp.id == editingId);
//     if (index > -1) {
//       employees[index] = { id: parseInt(editingId), firstName, lastName, email, department, role };
//     }
//     localStorage.removeItem("editingId");
//   } else {
//     // New employee
//     const newEmployee = {
//       id: Date.now(),
//       firstName,
//       lastName,
//       email,
//       department,
//       role,
//     };
//     employees.push(newEmployee);
//   }

//   localStorage.setItem("employees", JSON.stringify(employees));
//   alert("Employee saved!");
//   window.location.href = "index.html";
// }

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

// function startEdit(id) {
//   localStorage.setItem("editingId", id);
//   window.location.href = "form.html";
// }

// function prefillFormIfEditing() {
//   const editingId = localStorage.getItem("editingId");
//   if (!editingId) return;

//   employees = JSON.parse(localStorage.getItem("employees") || "[]");
//   const emp = employees.find(e => e.id == editingId);
//   if (!emp) return;

//   // Prefill values
//   document.getElementById("firstName").value = emp.firstName;
//   document.getElementById("lastName").value = emp.lastName;
//   document.getElementById("email").value = emp.email;
//   document.getElementById("department").value = emp.department;
//   document.getElementById("role").value = emp.role;
// }

// function deleteEmployee(id) {
//   if (!confirm("Are you sure you want to delete this employee?")) return;

//   employees = employees.filter(emp => emp.id !== id);
//   localStorage.setItem("employees", JSON.stringify(employees));
//   renderEmployeeDashboard();
// }




// import { renderEmployeeDashboard } from './render.js';

// let employees = JSON.parse(localStorage.getItem("employees") || "[]");

// let pagination = {
//   currentPage: 1,
//   itemsPerPage: 10
// };

// let filters = {
//   search: "",
//   sortBy: "",
//   filterFirstName: "",
//   filterDepartment: "",
//   filterRole: ""
// };

// window.addEventListener("DOMContentLoaded", () => {
//   renderEmployeeDashboard(employees, filters, pagination);
//   attachFormHandler();
//   prefillFormIfEditing();

//   document.getElementById("itemsPerPage")?.addEventListener("change", (e) => {
//     pagination.itemsPerPage = parseInt(e.target.value);
//     pagination.currentPage = 1;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });

//   document.getElementById("prevPage")?.addEventListener("click", () => {
//     if (pagination.currentPage > 1) {
//       pagination.currentPage--;
//       renderEmployeeDashboard(employees, filters, pagination);
//     }
//   });

//   document.getElementById("nextPage")?.addEventListener("click", () => {
//     pagination.currentPage++;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });
// });

// document.getElementById("searchInput")?.addEventListener("input", (e) => {
//   filters.search = e.target.value.toLowerCase();
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("sortSelect")?.addEventListener("change", (e) => {
//   filters.sortBy = e.target.value;
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("filterToggleBtn")?.addEventListener("click", () => {
//   document.getElementById("filterPanel").classList.toggle("hidden");
// });

// document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
//   filters.filterFirstName = document.getElementById("filterFirstName").value.toLowerCase();
//   filters.filterDepartment = document.getElementById("filterDepartment").value.toLowerCase();
//   filters.filterRole = document.getElementById("filterRole").value.toLowerCase();
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
//   filters = { search: "", sortBy: "", filterFirstName: "", filterDepartment: "", filterRole: "" };
//   document.getElementById("searchInput").value = "";
//   document.getElementById("sortSelect").value = "";
//   document.getElementById("filterFirstName").value = "";
//   document.getElementById("filterDepartment").value = "";
//   document.getElementById("filterRole").value = "";
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// function attachFormHandler() {
//   const form = document.getElementById("employeeForm");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const editingId = localStorage.getItem("editingId");
//     handleFormSubmit(editingId);
//   });
// }

// function handleFormSubmit(editingId) {
//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const department = document.getElementById("department").value.trim();
//   const role = document.getElementById("role").value.trim();

//   if (!firstName || !lastName || !email || !department || !role) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   if (!validateEmail(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   employees = JSON.parse(localStorage.getItem("employees") || "[]");

//   if (editingId) {
//     const index = employees.findIndex(emp => emp.id == editingId);
//     if (index > -1) {
//       employees[index] = { id: parseInt(editingId), firstName, lastName, email, department, role };
//     }
//     localStorage.removeItem("editingId");
//   } else {
//     const newEmployee = {
//       id: Date.now(),
//       firstName,
//       lastName,
//       email,
//       department,
//       role,
//     };
//     employees.push(newEmployee);
//   }

//   localStorage.setItem("employees", JSON.stringify(employees));
//   alert("Employee saved!");
//   window.location.href = "index.html";
// }

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

// window.startEdit = function(id) {
//   localStorage.setItem("editingId", id);
//   window.location.href = "form.html";
// };

// window.deleteEmployee = function(id) {
//   if (!confirm("Are you sure you want to delete this employee?")) return;
//   employees = employees.filter(emp => emp.id !== id);
//   localStorage.setItem("employees", JSON.stringify(employees));
//   renderEmployeeDashboard(employees, filters, pagination);
// };

// function prefillFormIfEditing() {
//   const editingId = localStorage.getItem("editingId");
//   if (!editingId) return;

//   employees = JSON.parse(localStorage.getItem("employees") || "[]");
//   const emp = employees.find(e => e.id == editingId);
//   if (!emp) return;

//   document.getElementById("firstName").value = emp.firstName;
//   document.getElementById("lastName").value = emp.lastName;
//   document.getElementById("email").value = emp.email;
//   document.getElementById("department").value = emp.department;
//   document.getElementById("role").value = emp.role;
// }



// import { renderEmployeeDashboard } from './render.js';
// import {
//   loadEmployees,
//   saveEmployees,
//   getEditingId,
//   setEditingId,
//   clearEditingId
// } from './data.js';

// let employees = loadEmployees();

// let pagination = {
//   currentPage: 1,
//   itemsPerPage: 10
// };

// let filters = {
//   search: "",
//   sortBy: "",
//   filterFirstName: "",
//   filterDepartment: "",
//   filterRole: ""
// };

// window.addEventListener("DOMContentLoaded", () => {
//   renderEmployeeDashboard(employees, filters, pagination);
//   attachFormHandler();
//   prefillFormIfEditing();

//   document.getElementById("itemsPerPage")?.addEventListener("change", (e) => {
//     pagination.itemsPerPage = parseInt(e.target.value);
//     pagination.currentPage = 1;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });

//   document.getElementById("prevPage")?.addEventListener("click", () => {
//     if (pagination.currentPage > 1) {
//       pagination.currentPage--;
//       renderEmployeeDashboard(employees, filters, pagination);
//     }
//   });

//   document.getElementById("nextPage")?.addEventListener("click", () => {
//     pagination.currentPage++;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });
// });

// document.getElementById("searchInput")?.addEventListener("input", (e) => {
//   filters.search = e.target.value.toLowerCase();
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("sortSelect")?.addEventListener("change", (e) => {
//   filters.sortBy = e.target.value;
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("filterToggleBtn")?.addEventListener("click", () => {
//   document.getElementById("filterPanel").classList.toggle("hidden");
// });

// document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
//   filters.filterFirstName = document.getElementById("filterFirstName").value.toLowerCase();
//   filters.filterDepartment = document.getElementById("filterDepartment").value.toLowerCase();
//   filters.filterRole = document.getElementById("filterRole").value.toLowerCase();
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
//   filters = {
//     search: "",
//     sortBy: "",
//     filterFirstName: "",
//     filterDepartment: "",
//     filterRole: ""
//   };
//   document.getElementById("searchInput").value = "";
//   document.getElementById("sortSelect").value = "";
//   document.getElementById("filterFirstName").value = "";
//   document.getElementById("filterDepartment").value = "";
//   document.getElementById("filterRole").value = "";
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// function attachFormHandler() {
//   const form = document.getElementById("employeeForm");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const editingId = getEditingId();
//     handleFormSubmit(editingId);
//   });
// }

// function handleFormSubmit(editingId) {
//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const department = document.getElementById("department").value.trim();
//   const role = document.getElementById("role").value.trim();

//   if (!firstName || !lastName || !email || !department || !role) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   if (!validateEmail(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   employees = loadEmployees();

//   if (editingId) {
//     const index = employees.findIndex(emp => emp.id == editingId);
//     if (index > -1) {
//       employees[index] = { id: parseInt(editingId), firstName, lastName, email, department, role };
//     }
//     clearEditingId();
//   } else {
//     const newEmployee = {
//       id: Date.now(),
//       firstName,
//       lastName,
//       email,
//       department,
//       role
//     };
//     employees.push(newEmployee);
//   }

//   saveEmployees(employees);
//   alert("Employee saved!");
//   window.location.href = "index.html";
// }

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

// window.startEdit = function(id) {
//   setEditingId(id);
//   window.location.href = "form.html";
// };

// window.deleteEmployee = function(id) {
//   if (!confirm("Are you sure you want to delete this employee?")) return;

//   employees = employees.filter(emp => emp.id !== id);
//   saveEmployees(employees);
//   renderEmployeeDashboard(employees, filters, pagination);
// };

// function prefillFormIfEditing() {
//   const editingId = getEditingId();
//   if (!editingId) return;

//   employees = loadEmployees();
//   const emp = employees.find(e => e.id == editingId);
//   if (!emp) return;

//   document.getElementById("firstName").value = emp.firstName;
//   document.getElementById("lastName").value = emp.lastName;
//   document.getElementById("email").value = emp.email;
//   document.getElementById("department").value = emp.department;
//   document.getElementById("role").value = emp.role;
// }



// import { renderEmployeeDashboard } from './render.js';
// import {
//   loadEmployees,
//   saveEmployees,
//   getEditingId,
//   setEditingId,
//   clearEditingId
// } from './data.js';
// import {
//   filters,
//   updateSearchFilter,
//   updateSortFilter,
//   updateAdvancedFilters,
//   clearAllFilters
// } from './filters.js';

// let employees = loadEmployees();

// let pagination = {
//   currentPage: 1,
//   itemsPerPage: 10
// };

// window.addEventListener("DOMContentLoaded", () => {
//   renderEmployeeDashboard(employees, filters, pagination);
//   attachFormHandler();
//   prefillFormIfEditing();

//   document.getElementById("itemsPerPage")?.addEventListener("change", (e) => {
//     pagination.itemsPerPage = parseInt(e.target.value);
//     pagination.currentPage = 1;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });

//   document.getElementById("prevPage")?.addEventListener("click", () => {
//     if (pagination.currentPage > 1) {
//       pagination.currentPage--;
//       renderEmployeeDashboard(employees, filters, pagination);
//     }
//   });

//   document.getElementById("nextPage")?.addEventListener("click", () => {
//     pagination.currentPage++;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });
// });

// document.getElementById("searchInput")?.addEventListener("input", (e) => {
//   updateSearchFilter(e.target.value);
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("sortSelect")?.addEventListener("change", (e) => {
//   updateSortFilter(e.target.value);
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("filterToggleBtn")?.addEventListener("click", () => {
//   document.getElementById("filterPanel").classList.toggle("hidden");
// });

// document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
//   updateAdvancedFilters(
//     document.getElementById("filterFirstName").value,
//     document.getElementById("filterDepartment").value,
//     document.getElementById("filterRole").value
//   );
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
//   clearAllFilters();
//   document.getElementById("searchInput").value = "";
//   document.getElementById("sortSelect").value = "";
//   document.getElementById("filterFirstName").value = "";
//   document.getElementById("filterDepartment").value = "";
//   document.getElementById("filterRole").value = "";
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// function attachFormHandler() {
//   const form = document.getElementById("employeeForm");
//   if (!form) return;

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const editingId = getEditingId();
//     handleFormSubmit(editingId);
//   });
// }

// function handleFormSubmit(editingId) {
//   const firstName = document.getElementById("firstName").value.trim();
//   const lastName = document.getElementById("lastName").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const department = document.getElementById("department").value.trim();
//   const role = document.getElementById("role").value.trim();

//   if (!firstName || !lastName || !email || !department || !role) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   if (!validateEmail(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   employees = loadEmployees();

//   if (editingId) {
//     const index = employees.findIndex(emp => emp.id == editingId);
//     if (index > -1) {
//       employees[index] = { id: parseInt(editingId), firstName, lastName, email, department, role };
//     }
//     clearEditingId();
//   } else {
//     const newEmployee = {
//       id: Date.now(),
//       firstName,
//       lastName,
//       email,
//       department,
//       role
//     };
//     employees.push(newEmployee);
//   }

//   saveEmployees(employees);
//   alert("Employee saved!");
//   window.location.href = "index.html";
// }

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

// window.startEdit = function(id) {
//   setEditingId(id);
//   window.location.href = "form.html";
// };

// window.deleteEmployee = function(id) {
//   if (!confirm("Are you sure you want to delete this employee?")) return;

//   employees = employees.filter(emp => emp.id !== id);
//   saveEmployees(employees);
//   renderEmployeeDashboard(employees, filters, pagination);
// };

// function prefillFormIfEditing() {
//   const editingId = getEditingId();
//   if (!editingId) return;

//   employees = loadEmployees();
//   const emp = employees.find(e => e.id == editingId);
//   if (!emp) return;

//   document.getElementById("firstName").value = emp.firstName;
//   document.getElementById("lastName").value = emp.lastName;
//   document.getElementById("email").value = emp.email;
//   document.getElementById("department").value = emp.department;
//   document.getElementById("role").value = emp.role;
// }

// import { renderEmployeeDashboard } from './render.js';
// import {
//   loadEmployees,
//   saveEmployees,
//   getEditingId,
//   setEditingId,
//   clearEditingId
// } from './data.js';
// import {
//   filters,
//   updateSearchFilter,
//   updateSortFilter,
//   updateAdvancedFilters,
//   clearAllFilters
// } from './filters.js';
// import {
//   attachFormHandler,
//   prefillFormIfEditing
// } from './formHandler.js';

// let employees = loadEmployees();

// let pagination = {
//   currentPage: 1,
//   itemsPerPage: 10
// };

// window.addEventListener("DOMContentLoaded", () => {
//   renderEmployeeDashboard(employees, filters, pagination);
//   attachFormHandler(employees, renderEmployeeDashboard, filters, pagination);
//   prefillFormIfEditing(employees);

//   document.getElementById("itemsPerPage")?.addEventListener("change", (e) => {
//     pagination.itemsPerPage = parseInt(e.target.value);
//     pagination.currentPage = 1;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });

//   document.getElementById("prevPage")?.addEventListener("click", () => {
//     if (pagination.currentPage > 1) {
//       pagination.currentPage--;
//       renderEmployeeDashboard(employees, filters, pagination);
//     }
//   });

//   document.getElementById("nextPage")?.addEventListener("click", () => {
//     pagination.currentPage++;
//     renderEmployeeDashboard(employees, filters, pagination);
//   });
// });

// document.getElementById("searchInput")?.addEventListener("input", (e) => {
//   updateSearchFilter(e.target.value);
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("sortSelect")?.addEventListener("change", (e) => {
//   updateSortFilter(e.target.value);
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("filterToggleBtn")?.addEventListener("click", () => {
//   document.getElementById("filterPanel").classList.toggle("hidden");
// });

// document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
//   updateAdvancedFilters(
//     document.getElementById("filterFirstName").value,
//     document.getElementById("filterDepartment").value,
//     document.getElementById("filterRole").value
//   );
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
//   clearAllFilters();
//   document.getElementById("searchInput").value = "";
//   document.getElementById("sortSelect").value = "";
//   document.getElementById("filterFirstName").value = "";
//   document.getElementById("filterDepartment").value = "";
//   document.getElementById("filterRole").value = "";
//   renderEmployeeDashboard(employees, filters, pagination);
// });

// window.startEdit = function(id) {
//   setEditingId(id);
//   window.location.href = "form.html";
// };

// window.deleteEmployee = function(id) {
//   if (!confirm("Are you sure you want to delete this employee?")) return;

//   employees = employees.filter(emp => emp.id !== id);
//   saveEmployees(employees);
//   renderEmployeeDashboard(employees, filters, pagination);
// };


import { renderEmployeeDashboard } from './render.js';
import {
  loadEmployees,
  saveEmployees,
  setEditingId
} from './data.js';
import {
  filters,
  updateSearchFilter,
  updateSortFilter,
  updateAdvancedFilters,
  clearAllFilters
} from './filters.js';
import {
  attachFormHandler,
  prefillFormIfEditing
} from './formHandler.js';

let employees = loadEmployees();

let pagination = {
  currentPage: 1,
  itemsPerPage: 10
};

window.addEventListener("DOMContentLoaded", () => {
  renderEmployeeDashboard(employees, filters, pagination);
  attachFormHandler(employees); // ✅ Only employees needed here
  prefillFormIfEditing(employees);

  document.getElementById("itemsPerPage")?.addEventListener("change", (e) => {
    pagination.itemsPerPage = parseInt(e.target.value);
    pagination.currentPage = 1;
    renderEmployeeDashboard(employees, filters, pagination);
  });

  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (pagination.currentPage > 1) {
      pagination.currentPage--;
      renderEmployeeDashboard(employees, filters, pagination);
    }
  });

  document.getElementById("nextPage")?.addEventListener("click", () => {
    pagination.currentPage++;
    renderEmployeeDashboard(employees, filters, pagination);
  });
});

const filterToggleBtn = document.getElementById("filterToggleBtn");
const filterModal = document.getElementById("filterModal");
const modalOverlay = document.querySelector(".modal-overlay");

filterToggleBtn?.addEventListener("click", () => {
  filterModal.classList.remove("hidden");
  filterModal.classList.add("show");
});

modalOverlay?.addEventListener("click", () => {
  filterModal.classList.remove("show");
  setTimeout(() => {
    filterModal.classList.add("hidden");
  }, 300); // Wait for animation
});


// Search, Sort, Filters
document.getElementById("searchInput")?.addEventListener("input", (e) => {
  updateSearchFilter(e.target.value);
  renderEmployeeDashboard(employees, filters, pagination);
});

document.getElementById("sortSelect")?.addEventListener("change", (e) => {
  updateSortFilter(e.target.value);
  renderEmployeeDashboard(employees, filters, pagination);
});

document.getElementById("filterToggleBtn")?.addEventListener("click", () => {
  document.getElementById("filterPanel").classList.toggle("hidden");
});

document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
  updateAdvancedFilters(
    document.getElementById("filterFirstName").value,
    document.getElementById("filterDepartment").value,
    document.getElementById("filterRole").value
  );
  renderEmployeeDashboard(employees, filters, pagination);
});

document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
  clearAllFilters();
  document.getElementById("searchInput").value = "";
  document.getElementById("sortSelect").value = "";
  document.getElementById("filterFirstName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";
  renderEmployeeDashboard(employees, filters, pagination);
});

// Global functions for HTML buttons
window.startEdit = function(id) {
  setEditingId(id);
  window.location.href = "form.html";
};

window.deleteEmployee = function(id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  employees = employees.filter(emp => emp.id !== id);
  saveEmployees(employees);
  renderEmployeeDashboard(employees, filters, pagination);
};

