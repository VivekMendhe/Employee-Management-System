import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../types/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl = 'http://localhost:8088/api/addresses';

  constructor(private http: HttpClient) {}

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl);
  }

  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/${id}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.baseUrl, address);
  }

  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.baseUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  isDuplicateAddress(city: string, employeeId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/duplicate`, {
      params: { city, employeeId: employeeId.toString() },
    });
  }

  getAddressByNameAndDate(
    employeeName: string,
    date: string
  ): Observable<Address[]> {
    return this.http.get<Address[]>(
      `${this.baseUrl}/employee/${employeeName}/date`,
      {
        params: { date },
      }
    );
  }
}
