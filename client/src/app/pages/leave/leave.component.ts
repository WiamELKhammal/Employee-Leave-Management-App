import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Leave } from '../../module/Employee.module';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css'],
  standalone: false
})
export class LeaveComponent implements OnInit {
  leaves: Leave[] = [];
  selectedTab: 'all' | 'pending' | 'approved' = 'all';
  isModalOpen = false;

  newLeave: Partial<Leave> = {
    employeeId: 0,
    leaveType: '',
    fromDate: '',
    toDate: '',
    noOfDays: 0,
    details: '',
    isApproved: false
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllLeaves();
  }

  getAllLeaves() {
    this.employeeService.getAllLeaves().subscribe({
      next: (res) => (this.leaves = res?.data || []),
      error: () => alert('Failed to fetch leaves')
    });
  }

  get filteredLeaves(): Leave[] {
    return this.leaves.filter((leave) => {
      if (this.selectedTab === 'pending') return !leave.isApproved;
      if (this.selectedTab === 'approved') return leave.isApproved;
      return true;
    });
  }

  openLeaveModal() {
    this.isModalOpen = true;
  }

  closeLeaveModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.newLeave = {
      employeeId: 0,
      leaveType: '',
      fromDate: '',
      toDate: '',
      noOfDays: 0,
      details: '',
      isApproved: false
    };
  }

  submitLeave() {
    const start = new Date(this.newLeave.fromDate!);
    const end = new Date(this.newLeave.toDate!);
    this.newLeave.noOfDays = Math.max(1, (end.getTime() - start.getTime()) / 86400000 + 1);

    this.employeeService.addLeave(this.newLeave).subscribe({
      next: () => {
        alert('Leave request submitted');
        this.closeLeaveModal();
        this.getAllLeaves();
      },
      error: () => alert('Failed to submit leave')
    });
  }

approveLeave(id: number) {
  if (!id) {
    alert('Invalid leave ID');
    return;
  }

  console.log('Calling Approve API for ID:', id);

  this.employeeService.approveLeave(id).subscribe({
    next: () => {
      alert('Leave approved');
      this.getAllLeaves();
    },
    error: (err) => {
      console.error('Approve failed', err);
      alert(err?.error?.Message || 'Failed to approve leave.');
    }
  });
}

rejectLeave(id: number) {
  if (!id) {
    alert('Invalid leave ID');
    return;
  }

  console.log('Calling Reject API for ID:', id);

  this.employeeService.rejectLeave(id).subscribe({
    next: () => {
      alert('Leave rejected');
      this.getAllLeaves();
    },
    error: (err) => {
      console.error('Reject failed', err);
      alert(err?.error?.Message || 'Failed to reject leave.');
    }
  });
}


}
