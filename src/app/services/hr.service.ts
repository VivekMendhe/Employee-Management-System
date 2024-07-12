import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HR } from '../types/hr';

@Injectable({
  providedIn: 'root',
})
export class HrService {
  baseUrl = 'http://localhost:8088/api/hr';

  constructor(private httpClient: HttpClient) {}

  getAllHR(): Observable<HR[]> {
    return this.httpClient.get<HR[]>(this.baseUrl);
  }

  getHRById(id: number): Observable<HR> {
    return this.httpClient.get<HR>(`${this.baseUrl}/${id}`);
  }

  addHR(hr: HR): Observable<HR> {
    return this.httpClient.post<HR>(this.baseUrl, hr);
  }

  updateHR(id: number, hr: HR): Observable<HR> {
    return this.httpClient.put<HR>(`${this.baseUrl}/${id}`, hr);
  }

  deleteHR(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
