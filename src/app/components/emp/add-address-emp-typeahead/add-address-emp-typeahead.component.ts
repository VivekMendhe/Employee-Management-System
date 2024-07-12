import { Component } from '@angular/core';
import { Employee } from '../../../types/employee';
import { EmployeeService } from '../../../services/employee.service';
import { AddressService } from '../../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressWithId } from '../../../types/add';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';
import { Address } from '../../../types/address';

@Component({
  selector: 'app-add-address-emp-typeahead',
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
  templateUrl: './add-address-emp-typeahead.component.html',
  styleUrl: './add-address-emp-typeahead.component.css',
})
export class AddAddressEmpTypeaheadComponent {
  duplicateAddressError = false;
  cityError = false;
  loading = false;

  addressForm!: FormGroup;
  popularAddresses: string[] = [
    '1600 Pennsylvania Avenue, Washington, DC',
    'White House. 263 Prinsengracht, Amsterdam',
    'Home of Anne Frank in her diary. 1060 West Addison Street, Chigaco ',
    'Wrigley Field. 10 Downing Street, London, England',
    'House of the standing prime minister',
  ];
  filteredAddresses!: Observable<string[]>;

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
    private addressService: AddressService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    let id = this.route.snapshot.params['id'];
    this.address.employeeId = id;
    this.fetchEmployeeData(id);

    this.filteredAddresses = this.addressForm.controls[
      'city'
    ].valueChanges.pipe(
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
    this.empService.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
      console.log();

      if (!this.employee.addresses) {
        this.employee.addresses = [];
      }
    });
  }

  onAddressSelected(event: any): void {
    this.address.city = event.option.value;
  }

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
                if (this.address.city.length === 0) {
                  this.cityError = true;
                } else {
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

  addAddress(): void {
    this.addressService.createAddress(this.address).subscribe(
      (response) => {
        let id = this.route.snapshot.params['id'];
        console.log('Address created successfully!', response);
        this.router.navigateByUrl('/emp/' + id);
      },
      (error) => {
        console.error('Error creating address:', error);
      }
    );
  }
}
