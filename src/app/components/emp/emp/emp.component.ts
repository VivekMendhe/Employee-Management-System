import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../types/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-emp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css',
})
export class EmpComponent {
  emp: Employee[] = [];

  constructor(private empService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmp();
  }

  getAllEmp() {
    this.empService.getAllEmployees().subscribe((data) => {
      this.emp = data;
    });
  }
}
