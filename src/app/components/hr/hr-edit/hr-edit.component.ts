import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HrService } from '../../../services/hr.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HR } from '../../../types/hr';

@Component({
  selector: 'app-hr-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hr-edit.component.html',
  styleUrl: './hr-edit.component.css',
})
export class HrEditComponent {
  hr: HR = {
    id: 0,
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
  };

  constructor(
    private hrService: HrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadHR(id);
  }

  loadHR(id: number): void {
    this.hrService.getHRById(id).subscribe({
      next: (hr) => {
        this.hr = hr;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  onSubmit(): void {
    const id = this.hr.id;
    this.hrService.updateHR(id, this.hr).subscribe({
      next: (updatedHR) => {
        console.log('HR updated successfully!', updatedHR);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
