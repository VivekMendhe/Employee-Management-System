import { Component } from '@angular/core';
import { Employee } from '../../../types/employee';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-edit-emp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-emp.component.html',
  styleUrl: './edit-emp.component.css',
})
export class EditEmpComponent {
  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    contact: '',
    addresses: [],
  };

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchEmployeeData(id);
  }

  // fetchEmployeeData(id: number): void {
  //   this.empService.getEmployeeById(id).subscribe((data: Employee) => {
  //     this.employee = data;
  //   });
  // }

  fetchEmployeeData(id: number): void {
    this.empService.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
      // Ensure addresses is initialized
      if (!this.employee.addresses) {
        this.employee.addresses = [];
      }
    });
  }

  submitForm(): void {
    console.log(this.employee);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Update employee details
    this.empService.updateEmployee(id, this.employee).subscribe(
      () => {
        console.log('Employee details updated successfully');
        this.router.navigateByUrl('/emp');
      },
      (error) => {
        console.error('Error updating employee details:', error);
      }
    );
  }
}
