import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports:[ CommonModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  processosExpirando: any[] = [];
  totalProcessos: number = 0;
  totalProcessosEticos: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getProcessosExpirando(7).subscribe(data => {
      this.processosExpirando = data;
    });

    this.dashboardService.getTotalProcessos().subscribe(count => {
      this.totalProcessos = count;
    });

    this.dashboardService.getTotalProcessosEticos().subscribe(count => {
      this.totalProcessosEticos = count;
    });
  }
}
