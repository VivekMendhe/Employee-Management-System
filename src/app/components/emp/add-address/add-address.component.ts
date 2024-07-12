import { Component, EventEmitter, Output } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../types/address';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { AddressWithId } from '../../../types/add';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css',
})
export class AddAddressComponent {
  @Output() formClosed = new EventEmitter<void>();

  address: AddressWithId = {
    city: '',
    effectiveDate: new Date().toISOString(),
    endDate: '',
    employeeId: 0,
  };

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private empService: EmployeeService
  ) {}

  closeForm() {
    this.formClosed.emit();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.address.employeeId = id;
  }

  onSubmit() {
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
