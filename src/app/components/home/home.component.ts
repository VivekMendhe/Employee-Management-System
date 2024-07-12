import { Component } from '@angular/core';
import { HrComponent } from '../hr/hr/hr.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HrComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
