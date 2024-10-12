import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Chart, ChartConfiguration, ChartData, ChartType, Color, registerables} from "chart.js";
import {ApiResponse, DashboardData} from "../../services/dashboard/dashboardmodel";
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit{
  totalRevenue: number = 0;
  salesToday: number = 0;
  tablesServedToday: number = 0;
  chart: Chart | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe(
      (data: DashboardData) => {
        console.log('Received dashboard data:', data);
        this.updateDashboard(data);
      },
      (error: any) => {
        console.error('Error al cargar los datos del dashboard:', error);
      }
    );
  }

  updateDashboard(data: DashboardData): void {
    this.salesToday = data.salesToday;
    this.tablesServedToday = data.tablesServedToday;
    this.totalRevenue = data.totalRevenue;

    this.createChart(data.dailySales);
  }

  createChart(dailySales: Array<{ date: string; amount: number }>): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dailySales.map(sale => sale.date),
        datasets: [{
          label: 'Ventas Diarias',
          data: dailySales.map(sale => sale.amount),
          backgroundColor: 'rgb(151,151,244)',
          borderColor: 'rgb(36,36,230)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Fecha'
            }
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            title: {
              display: true,
              text: 'Monto'
            }
          }
        }
      }
    });
  }
}
