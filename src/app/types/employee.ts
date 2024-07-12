import { Address } from './address';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  contact: string;
  addresses?: Address[];
}
