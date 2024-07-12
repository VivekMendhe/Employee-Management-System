import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HR } from '../../../types/hr';
import { HrService } from '../../../services/hr.service';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hr-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hr-details.component.html',
  styleUrl: './hr-details.component.css',
})
export class HrDetailsComponent {
  @Input() hr!: HR;
  @Output() editHr = new EventEmitter<HR>();
  @Output() viewHr = new EventEmitter<HR>();

  constructor(private hrService: HrService, private router: Router) {}

  onEdit() {
    this.editHr.emit(this.hr);
  }

  onView() {
    this.viewHr.emit(this.hr);
  }
}
