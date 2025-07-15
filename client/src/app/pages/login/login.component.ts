import { Component } from '@angular/core';
import { LoginModal } from '../../module/Employee.module';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
    standalone: false,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: LoginModal = new LoginModal();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onLogin() {
      console.log('Sending login object:', this.loginObj);
    this.employeeService.onLogin(this.loginObj).subscribe({
      next: (result: any) => {
        if (result.result) {
          alert('Login Success');
          localStorage.setItem('leaveUser', JSON.stringify(result.data));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert(result.message);
        }
      },
      error: () => {
        alert('Error occurred during login');
      }
    });
  }
}
