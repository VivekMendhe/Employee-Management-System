import { Component } from '@angular/core';
import { Employee } from '../../../types/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employee: Employee = {
    name: '',
    email: '',
    contact: '',
    addresses: [],
  };

  address = {
    city: '',
    effectiveDate: new Date().toISOString(), // Setting current date
    endDate: '', // Setting end date to null
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  // submitForm() {
  //   this.employeeService.createEmployee(this.employee).subscribe(
  //     (response) => {
  //       console.log('Employee created successfully!', response);
  //       // Optionally reset the form or handle success message
  //       this.router.navigateByUrl('/emp');
  //     },
  //     (error) => {
  //       console.error('Error creating employee:', error);
  //       // Handle error message or show error notification
  //     }
  //   );
  // }

  submitForm() {
    this.employee.addresses = [this.address]; // Add the address to the employee
    this.employeeService.createEmployee(this.employee).subscribe(
      (response) => {
        console.log('Employee created successfully!', response);
        this.router.navigateByUrl('/emp');
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }
}
