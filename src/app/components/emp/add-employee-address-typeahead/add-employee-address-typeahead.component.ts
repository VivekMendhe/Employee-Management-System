import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../services/address.service';
import { AddressWithId } from '../../../types/add';
import { Employee } from '../../../types/employee';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-employee-address-typeahead',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    MatFormFieldModule,
  ],
  templateUrl: './add-employee-address-typeahead.component.html',
  styleUrl: './add-employee-address-typeahead.component.css',
})
export class AddEmployeeAddressTypeaheadComponent {
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

  cityControl = new FormControl();
  popularAddresses: string[] = [
    '1600 Pennsylvania Avenue, Washington, DC',
    'White House, 263 Prinsengracht, Amsterdam',
    'Home of Anne Frank in her diary, 1060 West Addison Street, Chicago',
    'Wrigley Field, 10 Downing Street, London, England',
    'House of the standing prime minister',
  ];
  filteredAddresses!: Observable<string[]>;

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

    this.filteredAddresses = this.cityControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.popularAddresses.filter((address) =>
      this._normalizeValue(address).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
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
                this.addAddress();
              } else {
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
    const selectedCity = this.cityControl.value;
    if (selectedCity && this.popularAddresses.includes(selectedCity)) {
      this.address.city = selectedCity;
      this.addressService.createAddress(this.address).subscribe(
        (response: any) => {
          console.log('Address added successfully!', response);
          this.router.navigateByUrl(`/emp/${this.address.employeeId}`);
        },
        (error: any) => {
          console.error('Error adding address:', error);
        }
      );
    } else {
      this.cityError = true;
      console.error('Invalid city selection.');
    }
  }
}
