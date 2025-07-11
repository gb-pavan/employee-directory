<#-- Mock data directly in template for now -->
<#assign employees = [
  {"id": 1, "firstName": "Alice", "lastName": "Smith", "email": "alice@example.com", "department": "HR", "role": "Manager"},
  {"id": 2, "firstName": "Bob", "lastName": "Johnson", "email": "bob@example.com", "department": "IT", "role": "Developer"}
]>

<@layout>
  <div class="employee-grid">
    <#list employees as emp>
      <div class="employee-card">
        <h3>${emp.firstName} ${emp.lastName}</h3>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </#list>
  </div>
</@layout>
