import { Component } from '@angular/core';
import { Address } from '../../../types/address';
import { AddressService } from '../../../services/address.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-address',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './get-address.component.html',
  styleUrl: './get-address.component.css',
})
export class GetAddressComponent {
  addresses: Address[] = [];
  employeeName: string = '';
  date: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  /*getAddressByNameAndDate(): void {
    if (this.employeeName && this.date) {
      this.addressService
        .getAddressByNameAndDate(this.employeeName, this.date)
        .subscribe((addresses: Address[]) => {
          this.addresses = addresses;
        });
    }
  }*/

  getAddressByNameAndDate(): void {
    const selectedDate = new Date(this.date);
    const today = new Date();

    if (!this.employeeName) {
      this.errorMessage = '*The name field cannot be empty.';
      this.addresses = [];
      return;
    }

    if (!this.date) {
      this.errorMessage = '*The date field cannot be empty.';
      this.addresses = [];
      return;
    }

    if (selectedDate > today) {
      this.errorMessage = '*The selected date cannot be in the future.';
      this.addresses = [];
      return;
    }

    if (this.employeeName && this.date) {
      this.loading = true;
      this.addressService
        .getAddressByNameAndDate(this.employeeName, this.date)
        .subscribe(
          (addresses: Address[]) => {
            this.addresses = addresses;
            this.errorMessage = '';
            this.loading = false;
          },
          (error) => {
            this.errorMessage = 'An error occurred while fetching addresses.';
            this.addresses = [];
            this.loading = false;
          }
        );
    }
  }

  submitForm() {}
}
