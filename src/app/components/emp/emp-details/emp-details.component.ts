import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Employee } from '../../../types/employee';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import { AddressWithId } from '../../../types/add';
import { Location } from '@angular/common';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-emp-details',
  standalone: true,
  imports: [RouterLink, FormsModule, AddAddressComponent],
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css',
})
export class EmpDetailsComponent {
  emp!: Employee;
  editing = false;
  addressForm = false;

  showAddBatchForm: boolean = false;

  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    contact: '',
    addresses: [],
  };

  constructor(
    private empService: EmployeeService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getEmployeeById();
    const id = this.activatedRouter.snapshot.params['id'];
    this.fetchEmployeeData(id);
  }

  fetchEmployeeData(id: number): void {
    this.empService.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
    });
  }

  submitForm(): void {
    console.log(this.employee);
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Update employee details
    this.empService.updateEmployee(id, this.employee).subscribe(
      () => {
        console.log('Employee details updated successfully');
        this.getEmployeeById();
      },
      (error) => {
        console.error('Error updating employee details:', error);
      }
    );
  }

  // getEmployeeById() {
  //   let id = this.activatedRouter.snapshot.params['id'];
  //   this.empService.getEmployeeById(id).subscribe((data) => {
  //     // console.log({ data });
  //     this.emp = data;
  //   });
  // }

  getEmployeeById() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.empService.getEmployeeById(id).subscribe((data: Employee | null) => {
      if (data) {
        this.emp = data;
      } else {
        console.error('Employee data is null');
        this.router.navigateByUrl('/emp');
      }
    });
  }

  deleteEmp() {
    let id = this.activatedRouter.snapshot.params['id'];
    this.empService.deleteEmployee(id).subscribe(() => {
      console.log('Employee deleted successfully!');
      this.router.navigateByUrl('/emp');
    });
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  addressFormShown(): void {
    this.addressForm = !this.addressForm;
  }

  closeAddBatchForm() {
    this.addressForm = false;
  }
}
