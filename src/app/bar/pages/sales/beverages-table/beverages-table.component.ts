import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BeverageService} from "../../../services/beverage/beverage.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {BeverageselectedService} from "../../../services/beverageselected/beverageselected.service";

@Component({
  selector: 'app-beverages-table',
  templateUrl: './beverages-table.component.html',
  styleUrl: './beverages-table.component.css'
})
export class BeveragesTableComponent implements OnInit, AfterViewInit {
  beverages: any[] = [];
  dataSource = new MatTableDataSource<any>(this.beverages);
  displayedColumns: string[] = ['name', 'categoryName', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private beverageService: BeverageService,
    private beverageSelectedService: BeverageselectedService
  ) {}

  ngOnInit(): void {
    this.getBeverages();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getBeverages(): void {
    this.beverageService.getBeverages().subscribe(
      (response: any) => {
        this.beverages = response.data;
        this.dataSource.data = this.beverages;
      },
      (error) => {
        console.error('Error al obtener las bebidas:', error);
      }
    );
  }

  agregarPedido(beverage: any): void {
    console.log('Selected beverage:', beverage);
    if (!beverage || !beverage.id) {
      console.error('Bebida seleccionada no válida:', beverage);
      return;
    }
    this.beverageSelectedService.selectBeverage(beverage);
  }
}
