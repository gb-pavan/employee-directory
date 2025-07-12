export function renderEmployeeDashboard(employees, filters, pagination) {
  const container = document.getElementById("employeeContainer");
  if (!container) return;

  let filteredEmployees = [...employees];

  // Search
  if (filters.search) {
    filteredEmployees = filteredEmployees.filter(emp =>
      (emp.firstName + " " + emp.lastName).toLowerCase().includes(filters.search) ||
      emp.email.toLowerCase().includes(filters.search)
    );
  }

  // Filter
  if (filters.filterFirstName) {
    filteredEmployees = filteredEmployees.filter(emp =>
      emp.firstName.toLowerCase().includes(filters.filterFirstName)
    );
  }
  if (filters.filterDepartment) {
    filteredEmployees = filteredEmployees.filter(emp =>
      emp.department.toLowerCase().includes(filters.filterDepartment)
    );
  }
  if (filters.filterRole) {
    filteredEmployees = filteredEmployees.filter(emp =>
      emp.role.toLowerCase().includes(filters.filterRole)
    );
  }

  // Sort
  if (filters.sortBy) {
    const [field, order] = filters.sortBy.split("-");
    filteredEmployees.sort((a, b) => {
      const valA = a[field].toLowerCase();
      const valB = b[field].toLowerCase();
      return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  const totalEmployees = filteredEmployees.length;
  const totalPages = Math.ceil(totalEmployees / pagination.itemsPerPage);
  pagination.currentPage = Math.min(pagination.currentPage, totalPages || 1);

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const employeesToShow = filteredEmployees.slice(startIndex, endIndex);

  // Render
  if (filteredEmployees.length === 0) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }

  container.innerHTML = employeesToShow.map(emp => `
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

  document.getElementById("pageIndicator").textContent =
    `Page ${pagination.currentPage} of ${totalPages || 1}`;
}
