import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-tables',
  templateUrl: './view-tables.component.html',
  styleUrl: './view-tables.component.css'
})
export class ViewTablesComponent implements  OnInit{
  spaceId!: number;
  spaceName!: string;
  numberOfTables!: number;
  spaceImageUrl!: string;
  tables: { occupied: boolean }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spaceId = +params['id'];
      this.spaceName = params['name'];
      this.numberOfTables = +params['numberOfTables'];
      this.spaceImageUrl = 'https://i.postimg.cc/2yVKPSm4/mesa-venta-removebg-preview.png';

      this.tables = Array(this.numberOfTables).fill({ occupied: false });
    });
  }

  toggleOccupied(index: number): void {
    this.tables[index].occupied = !this.tables[index].occupied;
    if (this.tables[index].occupied) {
      this.router.navigate(['/order-tables/:mesaId', { mesaId: index + 1 }]);
    }
  }

  goBack(): void {
    this.router.navigate(['/sales']);  // Redirige a la página de espacios
  }
}
