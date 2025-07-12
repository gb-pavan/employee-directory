// public/js/filters.js

export const filters = {
  search: "",
  sortBy: "",
  filterFirstName: "",
  filterDepartment: "",
  filterRole: ""
};

export function updateSearchFilter(value) {
  filters.search = value.toLowerCase();
}

export function updateSortFilter(value) {
  filters.sortBy = value;
}

export function updateAdvancedFilters(firstName, department, role) {
  filters.filterFirstName = firstName.toLowerCase();
  filters.filterDepartment = department.toLowerCase();
  filters.filterRole = role.toLowerCase();
}

export function clearAllFilters() {
  filters.search = "";
  filters.sortBy = "";
  filters.filterFirstName = "";
  filters.filterDepartment = "";
  filters.filterRole = "";
}
