import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HrViewComponent } from './components/hr/hr-view/hr-view.component';
import { HrEditComponent } from './components/hr/hr-edit/hr-edit.component';
import { EmpComponent } from './components/emp/emp/emp.component';
import { EmpDetailsComponent } from './components/emp/emp-details/emp-details.component';
import { EditEmpComponent } from './components/emp/edit-emp/edit-emp.component';
import { AddEmployeeComponent } from './components/emp/add-employee/add-employee.component';
import { AddAddressComponent } from './components/emp/add-address/add-address.component';
import { AddAddressEmpComponent } from './components/emp/add-address-emp/add-address-emp.component';
import { AddEmployeeAddressComponent } from './components/emp/add-employee-address/add-employee-address.component';
import { GetAddressComponent } from './components/emp/get-address/get-address.component';

import { AddEmployeeTypeaheadTwoComponent } from './components/emp/add-employee-typeahead-two/add-employee-typeahead-two.component';
import { AddEmployeeAddressTypeaheadComponent } from './components/emp/add-employee-address-typeahead/add-employee-address-typeahead.component';
import { AddAddressEmpTypeaheadComponent } from './components/emp/add-address-emp-typeahead/add-address-emp-typeahead.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'emp', component: EmpComponent },
  { path: 'add-emp', component: AddEmployeeComponent },
  { path: 'add-emp-ahead', component: AddEmployeeTypeaheadTwoComponent },
  { path: 'add-employee-address', component: AddEmployeeTypeaheadTwoComponent },
  {
    path: 'add-employee-address/:id',
    component: AddAddressEmpTypeaheadComponent,
  },
  // {
  //   path: 'add-employee-address/:id',
  //   component: AddAddressEmpComponent,
  // },
  // { path: 'add-employee-address', component: AddEmployeeAddressComponent },
  // { path: 'add-employee-address/:id', component: AddEmployeeAddressComponent },
  { path: 'get-employee-address', component: GetAddressComponent },
  { path: 'emp/:id', component: EmpDetailsComponent },
  { path: 'edit-emp/:id', component: EditEmpComponent },
  { path: 'add-address/:id', component: AddAddressComponent },
  { path: 'add-address-emp/:id', component: AddAddressEmpComponent },
  { path: 'view/:id', component: HrViewComponent },
  { path: 'edit/:id', component: HrEditComponent },
];
