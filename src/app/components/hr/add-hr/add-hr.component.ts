import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HrService } from '../../../services/hr.service';

import { HR } from '../../../types/hr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-hr',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-hr.component.html',
  styleUrl: './add-hr.component.css',
})
export class AddHrComponent {
  @Input() hr: HR = {
    id: 0,
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
  };

  @Output() hrAdded = new EventEmitter<HR>();
  @Output() hrUpdated = new EventEmitter<HR>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private hrService: HrService) {}

  onSubmit() {
    if (this.hr.id === 0) {
      this.hrService.addHR(this.hr).subscribe((hr) => {
        this.hrAdded.emit(hr); // Notify parent component that HR has been added
        this.closeModal.emit(); // Close the modal after adding
      });
    } else {
      this.hrService.updateHR(this.hr.id, this.hr).subscribe((hr) => {
        this.hrUpdated.emit(hr); // Notify parent component that HR has been updated
        this.closeModal.emit(); // Close the modal after updating
      });
    }
  }

  onClose() {
    this.closeModal.emit(); // Close the modal without saving
  }
}
