import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

interface Employee {
  employeeId: number;
  employeeName: string;
  deptId: number;
  deptName: string;
  contactNo: string;
  emailId: string;
  role: string;
  gender?: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  standalone: false,
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  departments: any[] = [];
  roles: any[] = [];
  isModalOpen: boolean = false;

  newEmployee = {
    employeeName: '',
    emailId: '',
    contactNo: '',
    deptId: '',
    gender: '',
    role: '',
    password: ''
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res?.data || [];
      },
      error: () => {
        alert('Failed to fetch employee data.');
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
    this.getDepartments();
    this.getRoles();
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  getDepartments() {
    this.employeeService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res?.data || [];
      },
      error: () => {
        alert('Failed to fetch departments.');
      }
    });
  }

  getRoles() {
    this.employeeService.getAllRoles().subscribe({
      next: (res) => {
        this.roles = res?.data || []; // <-- array of strings
      },
      error: () => {
        alert('Failed to fetch roles.');
      }
    });
  }

  submitNewEmployee() {
    console.log('Role being submitted:', this.newEmployee.role); // should log: "Employee" etc.
    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (res) => {
        alert('Employee added successfully');
        this.closeModal();
        this.getEmployees();
      },
      error: () => {
        alert('Failed to add employee.');
      }
    });
  }


  deleteEmployee(empId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(empId).subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.getEmployees();
        },
        error: () => {
          alert('Failed to delete employee.');
        }
      });
    }
  }

  resetForm() {
    this.newEmployee = {
      employeeName: '',
      emailId: '',
      contactNo: '',
      deptId: '',
      gender: '',
      role: '',
      password: ''
    };
  }
}
