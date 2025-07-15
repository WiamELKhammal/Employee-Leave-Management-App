export class LoginModal {
  emailId: String;
  password: String;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}
export interface APIResponseModel<T> {
  message: String;
  result: Boolean;
  data: T;
}

export interface EmployeeList {
  employeeId: Number;
  employeeName: String;
  deptId: Number;
  deptName: String;
  contactNo: String;
  emailId: String;
  role: String;
  gender?: String;
}
export interface Leave {
  leaveId: number;
  employeeId: number;
  fromDate: string;
  toDate: string;
  noOfDays: number;
  leaveType: string;
  details: string;
  isApproved: boolean;
  approvedDate?: string;
}

