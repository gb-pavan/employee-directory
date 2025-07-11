<#-- templates/form.ftlh -->

<@layout>
  <div class="form-container">
    <h2>Add / Edit Employee</h2>
    
    <form id="employeeForm" onsubmit="return false;">
      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name<span class="required">*</span></label>
        <input type="text" id="firstName" name="firstName" required />
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastName">Last Name<span class="required">*</span></label>
        <input type="text" id="lastName" name="lastName" required />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email<span class="required">*</span></label>
        <input type="email" id="email" name="email" required />
      </div>

      <!-- Department -->
      <div class="form-group">
        <label for="department">Department<span class="required">*</span></label>
        <select id="department" name="department" required>
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <!-- Role -->
      <div class="form-group">
        <label for="role">Role<span class="required">*</span></label>
        <input type="text" id="role" name="role" required />
      </div>

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit" id="submitBtn">Save</button>
        <button type="button" onclick="window.history.back();">Cancel</button>
      </div>
    </form>
  </div>
</@layout>
