import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb, BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
