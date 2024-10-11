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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private router: Router,
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
      (response: any) => {
        console.log('Orders fetched from backend:', response.data);
        const ordersWithItems = response.data.flatMap((order: any) =>
          order.items.map((item: any) => ({
            ...item,
            orderId: order.id,
            subtotal: item.quantity * item.beveragePrice
          }))
        );
        this.orders = ordersWithItems;
        this.dataSource.data = this.orders;
        this.calculateTotal();
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
      subtotal: beverage.price
    };

    this.orders.push(newOrderItem);
    this.dataSource.data = this.orders;
    this.calculateTotal();
    this.cdr.detectChanges();
  }

  updateQuantity(item: any): void {
    item.subtotal = item.quantity * item.beveragePrice;
    this.calculateTotal();
    this.cdr.detectChanges();
  }

  toggleDelivered(item: any): void {
    item.delivered = !item.delivered;
    this.cdr.detectChanges();
  }

  deleteOrder(item: any): void {
    const index = this.orders.indexOf(item);
    if (index !== -1) {
      this.orders.splice(index, 1);
      this.dataSource.data = this.orders;
      this.calculateTotal();
      this.cdr.detectChanges();
    }
  }

  calculateTotal(): void {
    this.total = this.orders.reduce((acc, item) => acc + item.subtotal, 0);
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
      this.getOrdersForTable(); // Refresh orders after closing
    });
  }

  confirmarOrden(): void {
    const orderRequest: OrderRequest = {
      tableSpaceId: this.spaceId,
      tableId: this.mesaId,
      items: this.orders.map(item => ({
        beverageId: item.beverageId,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(orderRequest).subscribe(response => {
      console.log('Orden creada con éxito:', response);
      this.getOrdersForTable(); // Refresh orders after creating a new one
    }, error => {
      console.error('Error al crear la orden:', error);
    });
  }
}
