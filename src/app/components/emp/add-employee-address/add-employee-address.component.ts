import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../services/address.service';
import { AddressWithId } from '../../../types/add';
import { Employee } from '../../../types/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee-address',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-employee-address.component.html',
  styleUrl: './add-employee-address.component.css',
})
export class AddEmployeeAddressComponent {
  duplicateAddressError = false;
  cityError = false;
  employeeError = false;
  isEditMode = false;

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    contact: '',
    addresses: [],
  };

  address: AddressWithId = {
    city: '',
    effectiveDate: new Date().toISOString(),
    endDate: '',
    employeeId: 0,
  };

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.address.employeeId = +id;
      this.fetchEmployeeData(this.address.employeeId);
    }
  }

  fetchEmployeeData(id: number): void {
    this.empService.getEmployeeById(id).subscribe(
      (data: Employee) => {
        this.employee = data;
      },
      (error: any) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  submitForm(): void {
    // First, validate the address
    this.addressService
      .isDuplicateAddress(this.address.city, this.address.employeeId)
      .subscribe(
        (isDuplicate: any) => {
          if (isDuplicate) {
            this.duplicateAddressError = true;
            console.error(
              'Duplicate address detected. Form submission stopped.'
            );
          } else {
            this.duplicateAddressError = false;
            if (this.address.city.length === 0) {
              this.cityError = true;
            } else {
              this.cityError = false;
              if (this.address.employeeId) {
                // Adding address for existing employee
                this.addAddress();
              } else {
                // Creating new employee and address
                this.createEmployeeAndAddress();
              }
            }
          }
        },
        (error: any) => {
          console.error('Error checking for duplicate address:', error);
        }
      );
  }

  createEmployeeAndAddress(): void {
    this.empService.createEmployee(this.employee).subscribe(
      (createdEmployee: any) => {
        console.log('Employee created successfully', createdEmployee);
        this.address.employeeId = createdEmployee.id!;
        this.addAddress();
      },
      (error: any) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  addAddress(): void {
    this.addressService.createAddress(this.address).subscribe(
      (response: any) => {
        console.log('Address added successfully!', response);
        this.router.navigateByUrl(`/emp/${this.address.employeeId}`);
      },
      (error: any) => {
        console.error('Error adding address:', error);
      }
    );
  }
}
