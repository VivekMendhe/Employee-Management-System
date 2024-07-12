import { Component, ViewChild } from '@angular/core';
import { HR } from '../../../types/hr';
import { HrService } from '../../../services/hr.service';
import { HrDetailsComponent } from '../hr-details/hr-details.component';
import { AddHrComponent } from '../add-hr/add-hr.component';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [HrDetailsComponent, AddHrComponent],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css',
})
export class HrComponent {
  hr: HR[] = [];
  showAddHrModal = false;

  selectedHr: HR = {
    id: 0,
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
  };

  constructor(private hrService: HrService) {}

  ngOnInit() {
    this.getAllHR();
  }

  getAllHR() {
    this.hrService.getAllHR().subscribe((data) => {
      this.hr = data;
    });
  }

  openAddHrModal() {
    this.selectedHr = {
      id: 0,
      name: '',
      email: '',
      password: '',
      city: '',
      country: '',
    };
    this.showAddHrModal = true;
  }

  closeAddHrModal() {
    this.showAddHrModal = false;
  }

  onHrAdded(newHr: HR) {
    this.hr.push(newHr);
  }

  onHrUpdated(updatedHr: HR) {
    const index = this.hr.findIndex((hr) => hr.id === updatedHr.id);
    if (index !== -1) {
      this.hr[index] = updatedHr;
    }
  }

  onEditHr(hr: HR) {
    this.selectedHr = { ...hr };
    this.showAddHrModal = true;
  }

  trackById(index: number, item: HR): number {
    return item.id;
  }
}
