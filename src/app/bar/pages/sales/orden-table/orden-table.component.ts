import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrdersService} from "../../../services/sales/orders.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  ApiResponse,
  OrderItemRequest,
  OrderItemResponse,
  OrderRequest,
  OrderResponse
} from "../../../services/sales/ssalesmodel";
import {CollectMoneyDialogComponent} from "../collect-money-dialog/collect-money-dialog.component";
import {BeveragesTableComponent} from "../beverages-table/beverages-table.component";
import {BeverageselectedService} from "../../../services/beverageselected/beverageselected.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-orden-table',
  templateUrl: './orden-table.component.html',
  styleUrl: './orden-table.component.css'
})
export class OrdenTableComponent implements OnInit{
  mesaId: number = 0;
  spaceId: number = 0;
  spaceName: string = '';
  orders: any[] = [];
  dataSource: MatTableDataSource<any>;
  total: number = 0;
  displayedColumns: string[] = ['beverage', 'quantity', 'price', 'subtotal', 'delivered', 'actions'];
  hasChanges: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private dialog: MatDialog,
    private beverageSelectedService: BeverageselectedService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mesaId = +params['mesaId'];
      this.spaceId = +params['spaceId'];
      this.spaceName = params['spaceName'];
      this.getOrdersForTable();
    });

    this.beverageSelectedService.beverageSelected$.subscribe((beverage: any) => {
      this.addBeverageToOrder(beverage);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getOrdersForTable(): void {
    this.orderService.getOrdersByTableSpaceId(this.spaceId, this.mesaId).subscribe(
      (response: ApiResponse<OrderResponse[]>) => {
        console.log('Orders fetched from backend:', response.data);
        this.orders = response.data.flatMap((order: OrderResponse) =>
          order.items.map((item: any) => ({
            ...item,
            orderId: order.id,
            subtotal: item.quantity * item.beveragePrice,
            isNew: false,
            isModified: false,
            isDeleted: false
          }))
        );
        this.dataSource.data = this.orders;
        this.calculateTotal();
        this.hasChanges = false;
        console.log('Orders set in component:', this.orders);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  addBeverageToOrder(beverage: any): void {
    const newOrderItem: any = {
      id: Date.now(),
      orderId: 0,
      beverageId: beverage.id,
      beverageName: beverage.name,
      beveragePrice: beverage.price,
      quantity: 1,
      delivered: false,
      subtotal: beverage.price,
      isNew: true,
      isModified: false,
      isDeleted: false
    };

    this.orders.push(newOrderItem);
    this.dataSource.data = this.orders;
    this.calculateTotal();
    this.hasChanges = true;
    this.cdr.detectChanges();
  }

  updateQuantity(item: any): void {
    item.subtotal = item.quantity * item.beveragePrice;
    item.isModified = true;
    this.calculateTotal();
    this.hasChanges = true;
    this.cdr.detectChanges();
  }

  toggleDelivered(item: any): void {
    item.delivered = !item.delivered;
    item.isModified = true;
    this.hasChanges = true;
    this.cdr.detectChanges();
  }

  deleteOrder(item: any): void {
    if (item.isNew) {
      const index = this.orders.indexOf(item);
      if (index !== -1) {
        this.orders.splice(index, 1);
      }
    } else {
      item.isDeleted = true;
    }
    this.dataSource.data = this.orders.filter(order => !order.isDeleted);
    this.calculateTotal();
    this.hasChanges = true;
    this.cdr.detectChanges();
  }

  calculateTotal(): void {
    this.total = this.orders
      .filter(item => !item.isDeleted)
      .reduce((acc, item) => acc + item.subtotal, 0);
  }

  openAgregarPedidoDialog(): void {
    const dialogRef = this.dialog.open(BeveragesTableComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBeverageToOrder(result);
      }
    });
  }

  openCobrarDialog(): void {
    const dialogRef = this.dialog.open(CollectMoneyDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.confirmarVenta();
      }
    });
  }

  confirmarVenta(): void {
    this.orderService.closeOrder(this.mesaId).subscribe(response => {
      console.log('Venta confirmada y cerrada', response);
      this.getOrdersForTable();
    }, error => {
      console.error('Error al cerrar la venta:', error);
    });
  }

  confirmarOrden(): void {
    if (!this.hasChanges) {
      console.log('No hay cambios para confirmar');
      return;
    }

    const orderItems: OrderItemRequest[] = this.orders
      .filter(item => item.isModified || item.isNew)
      .map(item => ({
        beverageId: item.beverageId,
        quantity: item.quantity,
        delivered: item.delivered
      }));

    const request = {
      tableSpaceId: this.spaceId,
      tableId: this.mesaId,
      items: orderItems
    };

    this.orderService.createOrder(request).subscribe(
      (response: ApiResponse<OrderResponse>) => {
        console.log('Orden actualizada con éxito:', response);

        this.orders.forEach(item => {
          if (item.isModified && item.delivered) {
            this.orderService.updateOrderItemStatus(item.orderId, item.id, item.delivered).subscribe(
              () => {
                console.log('Estado de entrega actualizado con éxito');
              },
              error => {
                console.error('Error al actualizar el estado de entrega:', error);
              }
            );
          }
        });

        this.orders.forEach(item => {
          if (item.isDeleted) {
            this.orderService.deleteOrderItem(item.orderId, item.id).subscribe(
              () => {
                console.log('Pedido eliminado con éxito');
              },
              error => {
                console.error('Error al eliminar el pedido:', error);
              }
            );
          }
        });

        this.getOrdersForTable();
        this.hasChanges = false;
      },
      error => {
        console.error('Error al actualizar la orden:', error);
      }
    );
  }
}
