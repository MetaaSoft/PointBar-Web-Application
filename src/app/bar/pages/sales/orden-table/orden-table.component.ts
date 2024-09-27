import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrdersService} from "../../../services/sales/orders.service";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {BeveragesTableComponent} from "../beverages-table/beverages-table.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiResponse, OrderRequest, OrderResponse} from "../../../services/sales/ssalesmodel";
import {BeverageselectedService} from "../../../services/beverageselected/beverageselected.service";

@Component({
  selector: 'app-orden-table',
  templateUrl: './orden-table.component.html',
  styleUrl: './orden-table.component.css'
})
export class OrdenTableComponent implements OnInit{
  mesaId: number = 0;
  orders: any[] = [];
  dataSource = new MatTableDataSource<any>(this.orders);
  total: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrdersService, private route: ActivatedRoute, private dialog: MatDialog, private beverageSelectedService: BeverageselectedService) { }

  ngOnInit(): void {
    this.mesaId = this.route.snapshot.params['mesaId'];
    this.getOrdersForTable();
    this.beverageSelectedService.beverageSelected$.subscribe((beverage: any) => {
      this.addBeverageToOrder(beverage);
    });
  }

  getOrdersForTable(): void {
    this.orderService.getOrdersByTableId(this.mesaId).subscribe((response: ApiResponse<OrderResponse[]>) => {
      this.orders = response.data;
      this.dataSource.data = this.orders;
      this.total = this.orders.reduce((acc, order) => acc + order.total, 0);
    });
  }

  addBeverageToOrder(beverage: any): void {
    const newOrder: OrderRequest = {
      tableSpaceId: this.mesaId,
      items: [
        {
          beverageId: beverage.id,
          quantity: 1
        }
      ]
    };
    this.orderService.createOrder(newOrder).subscribe((response: ApiResponse<OrderResponse>) => {
      this.getOrdersForTable();
    });
  }

  updateOrderItemStatus(order: any, delivered: boolean): void {
    this.orderService.updateOrderItemStatus(order.id, order.items[0].id, delivered).subscribe((response: ApiResponse<null>) => {
      this.getOrdersForTable();
    });
  }

  closeOrder(order: any): void {
    this.orderService.closeOrder(order.id).subscribe((response: ApiResponse<OrderResponse>) => {
      this.getOrdersForTable();
    });
  }

  openAgregarPedidoDialog(): void {
    const dialogRef = this.dialog.open(BeveragesTableComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  decrementQuantity(order: any): void {
    if (order.quantity > 1) {
      order.quantity--;
      this.updateOrderItemStatus(order, order.delivered);
    }
  }

  incrementQuantity(order: any): void {
    order.quantity++;
    this.updateOrderItemStatus(order, order.delivered);
  }

  deleteOrder(order: any): void {
    this.orderService.deleteOrderItem(order.id, order.items[0].id).subscribe((response: ApiResponse<null>) => {
      this.getOrdersForTable();
    });
  }
}
