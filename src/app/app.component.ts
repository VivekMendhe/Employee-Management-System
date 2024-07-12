import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { HrComponent } from './components/hr/hr/hr.component';
import { HrDetailsComponent } from './components/hr/hr-details/hr-details.component';
import { HomeComponent } from './components/home/home.component';
import { EmpComponent } from './components/emp/emp/emp.component';
import { EmpDetailsComponent } from './components/emp/emp-details/emp-details.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    HrComponent,
    HrDetailsComponent,
    EmpComponent,
    EmpDetailsComponent,
    HeaderComponent,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormField,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hr-management-system';
}
