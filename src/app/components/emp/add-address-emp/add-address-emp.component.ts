import { Component } from '@angular/core';
import { Employee } from '../../../types/employee';
import { EmployeeService } from '../../../services/employee.service';
import { AddressService } from '../../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddressWithId } from '../../../types/add';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-address-emp',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-address-emp.component.html',
  styleUrl: './add-address-emp.component.css',
})
export class AddAddressEmpComponent {
  duplicateAddressError = false;
  cityError = false;

  loading = false; // Loader flag

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    contact: '',
    addresses: [],
  };

  address: AddressWithId = {
    city: '',
    effectiveDate: '',
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
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    let id = this.route.snapshot.params['id'];
    this.address.employeeId = id;
    this.fetchEmployeeData(id);
  }

  fetchEmployeeData(id: number): void {
    this.empService.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
      console.log();

      if (!this.employee.addresses) {
        this.employee.addresses = [];
      }
    });
  }

  // submitForm(): void {
  //   // Update employee details first
  //   let id = this.route.snapshot.params['id'];
  //   this.empService.updateEmployee(id, this.employee).subscribe(
  //     () => {
  //       console.log('Employee details updated successfully');
  //       // After updating employee details, add the address
  //       this.addAddress();
  //     },
  //     (error) => {
  //       console.error('Error updating employee details:', error);
  //     }
  //   );
  // }

  // addAddress(): void {
  //   this.addressService.createAddress(this.address).subscribe(
  //     (response) => {
  //       console.log('Address added successfully!', response);
  //       this.router.navigateByUrl(`/emp/${this.employee.id}`);
  //     },
  //     (error) => {
  //       console.error('Error adding address:', error);
  //     }
  //   );
  // }

  submitForm(): void {
    this.addressService
      .isDuplicateAddress(this.address.city, this.address.employeeId)
      .subscribe(
        (isDuplicate) => {
          if (isDuplicate) {
            this.duplicateAddressError = true; // Show error message
            console.error(
              'Duplicate address detected. Form submission stopped.'
            );
          } else {
            this.duplicateAddressError = false; // Hide error message
            let id = this.route.snapshot.params['id'];
            this.empService.getEmployeeById(id).subscribe(
              () => {
                if (this.address.city.length == 0) {
                  this.cityError = true;
                } else {
                  console.log('Employee details updated successfully');
                  this.addAddress();
                }
              },
              (error) => {
                console.error('Error updating employee details:', error);
              }
            );
          }
        },
        (error: any) => {
          console.error('Error checking for duplicate address:', error);
        }
      );
  }

  addAddress() {
    this.addressService.createAddress(this.address).subscribe(
      (response) => {
        let id = this.route.snapshot.params['id'];
        console.log('Employee created successfully!', response);
        this.router.navigateByUrl('/emp/' + id);
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }
}
