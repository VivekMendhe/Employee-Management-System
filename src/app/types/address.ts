import { Employee } from './employee';

export interface Address {
  id?: number;
  city: string;
  effectiveDate: string;
  endDate?: string;
  employee?: Employee;
}
