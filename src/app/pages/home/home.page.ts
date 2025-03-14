import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[DashboardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  constructor(private router: Router) {}


}
