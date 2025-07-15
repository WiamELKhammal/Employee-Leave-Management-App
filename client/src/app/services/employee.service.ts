import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../module/Employee.module';
import { Leave } from '../module/Employee.module';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  /* ---------- AUTH ---------- */
  onLogin(obj: any): Observable<any> {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login',
      obj
    );
  }

  /* ---------- EMPLOYEE ---------- */
  getAllEmployees(): Observable<any> {
    return this.http.get(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees'
    );
  }

  getDepartments(): Observable<any> {
    return this.http.get(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments'
    );
  }

  getAllRoles(): Observable<any> {
    // <-- URL corrigée
    return this.http.get(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles'
    );
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee',
      employee
    );
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(
      `https://freeapi.miniprojectideas.com/api/EmployeeLeave/DeleteEmployee?employeeId=${employeeId}`
    );
  }

  /* ---------- LEAVE ---------- */
  /** Liste complète des congés */

getAllLeaves(): Observable<APIResponseModel<Leave[]>> {
  return this.http.get<APIResponseModel<Leave[]>>(
    'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeaves'
  );
}

  addLeave(payload: Partial<Leave>): Observable<any> {
    return this.http.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/AddLeave', payload);
  }

rejectLeave(id: number): Observable<any> {
  return this.http.get(
    `https://freeapi.miniprojectideas.com/api/EmployeeLeave/RejectLeave?leaveId=${id}`
  );
}

approveLeave(id: number): Observable<any> {
  return this.http.get(
    `https://freeapi.miniprojectideas.com/api/EmployeeLeave/ApproveLeave?leaveId=${id}`
  );
}



}
