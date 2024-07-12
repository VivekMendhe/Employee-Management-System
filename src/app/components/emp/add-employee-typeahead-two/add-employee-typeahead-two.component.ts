import { Component } from '@angular/core';
import { Employee } from '../../../types/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-employee-typeahead-two',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    CommonModule,
    AsyncPipe,
    MatFormFieldModule,
  ],
  templateUrl: './add-employee-typeahead-two.component.html',
  styleUrl: './add-employee-typeahead-two.component.css',
})
export class AddEmployeeTypeaheadTwoComponent {
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

  cityControl = new FormControl();
  popularAddresses: string[] = [
    '1600 Pennsylvania Avenue, Washington, DC',
    'White House. 263 Prinsengracht, Amsterdam',
    'Home of Anne Frank in her diary. 1060 West Addison Street, Chigaco ',
    'Wrigley Field. 10 Downing Street, London, England',
    'House of the standing prime minister',
  ];
  filteredAddresses!: Observable<string[]>;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
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

  submitForm() {
    this.address.city = this.cityControl.value; // Get the city value from FormControl
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

  /*submitForm() {
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
  }*/
}
