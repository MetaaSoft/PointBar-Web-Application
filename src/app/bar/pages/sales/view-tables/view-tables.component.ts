import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-tables',
  templateUrl: './view-tables.component.html',
  styleUrl: './view-tables.component.css'
})
export class ViewTablesComponent implements  OnInit{
  spaceId!: number; // ID del espacio de mesas (TableSpace)
  spaceName!: string;
  numberOfTables!: number;
  spaceImageUrl!: string;
  tables: { occupied: boolean }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spaceId = +params['id']; // Obtenemos el ID del espacio
      this.spaceName = params['name'];
      this.numberOfTables = +params['numberOfTables'];
      this.spaceImageUrl = 'https://i.postimg.cc/2yVKPSm4/mesa-venta-removebg-preview.png';
      this.tables = Array(this.numberOfTables).fill({ occupied: false });
    });
  }

  // Al hacer clic en una mesa, enviamos el espacio y la mesa seleccionada
  attendTable(mesaId: number): void {
    this.router.navigate(['/order-tables', { mesaId, spaceName: this.spaceName, spaceId: this.spaceId }]);
  }

  goBack(): void {
    this.router.navigate(['/sales']);
  }
}
