import { Component } from '@angular/core';
import { HrService } from '../../../services/hr.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HR } from '../../../types/hr';

@Component({
  selector: 'app-hr-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hr-view.component.html',
  styleUrl: './hr-view.component.css',
})
export class HrViewComponent {
  hrId!: number;
  hrDetails!: HR;

  constructor(
    private route: ActivatedRoute,
    private hrService: HrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hrId = +params['id'];
      this.loadHrDetails(this.hrId);
    });
  }

  loadHrDetails(id: number) {
    this.hrService.getHRById(id).subscribe((hr: HR) => {
      this.hrDetails = hr;
    });
  }

  deleteHr() {
    let id = this.route.snapshot.params['id'];
    this.hrService.deleteHR(id).subscribe(() => {
      console.log(`HR with ID ${id} deleted successfully.`);
      this.router.navigateByUrl('/');
    });
  }
}
