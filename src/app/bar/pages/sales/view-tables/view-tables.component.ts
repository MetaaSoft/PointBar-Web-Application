import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrdersService} from "../../../services/sales/orders.service";

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
  orders: { [key: number]: boolean } = {};

  constructor(private route: ActivatedRoute, private router: Router, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spaceId = +params['id'];
      this.spaceName = params['name'];
      this.numberOfTables = +params['numberOfTables'];
      this.spaceImageUrl = 'https://i.postimg.cc/2yVKPSm4/mesa-venta-removebg-preview.png';
      this.tables = Array(this.numberOfTables).fill({ occupied: false });

      for (let i = 1; i <= this.numberOfTables; i++) {
        this.ordersService.getOrdersByTableSpaceId(this.spaceId, i).subscribe(response => {
          if (response.data.length > 0) {
            this.orders[i] = true;
          }
        });
      }
    });
  }

  attendTable(mesaId: number): void {
    this.router.navigate(['/order-tables', { mesaId, spaceName: this.spaceName, spaceId: this.spaceId }]);
    this.orders[mesaId] = true;
  }

  goBack(): void {
    this.router.navigate(['/sales']);
  }
}
