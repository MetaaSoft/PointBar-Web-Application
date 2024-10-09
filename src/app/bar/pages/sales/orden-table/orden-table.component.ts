import {Component, OnInit, ViewChild} from '@angular/core';
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
  dataSource = new MatTableDataSource<OrderItemResponse>(this.orders);
  total: number = 0;
  displayedColumns: string[] = ['beverage', 'quantity', 'price', 'subtotal', 'delivered', 'actions'];

  // Para evitar múltiples actualizaciones rápidas
  private updateTimeout: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private router: Router,
    private dialog: MatDialog,
    private beverageSelectedService: BeverageselectedService
  ) {}

  ngOnInit(): void {
    // Aquí obtenemos tanto el spaceId como el mesaId
    this.mesaId = this.route.snapshot.params['mesaId'];
    this.spaceId = this.route.snapshot.params['spaceId'];
    this.spaceName = this.route.snapshot.params['spaceName'];

    // Verificamos que ambos IDs se están obteniendo correctamente
    if (!this.spaceId || !this.mesaId) {
      console.error('No se encontró el ID del espacio o de la mesa');
    }

    this.getOrdersForTable();

    // Suscribirse a la selección de bebida desde el modal
    this.beverageSelectedService.beverageSelected$.subscribe((beverage: any) => {
      this.addBeverageToOrder(beverage);
    });
  }

  // Función para abrir el diálogo de agregar bebida
  openAgregarPedidoDialog(): void {
    const dialogRef = this.dialog.open(BeveragesTableComponent, {
      width: '800px',
      height: '600px'
    });

    // Escuchar el evento cuando el modal está abierto para recargar las bebidas
    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.getBeverages(); // Llamamos a getBeverages al abrir el modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBeverageToOrder(result);
      }
    });
  }

  getOrdersForTable(): void {
    this.orderService.getOrdersByTableSpaceId(this.spaceId, this.mesaId).subscribe(
      (response: ApiResponse<OrderResponse[]>) => {
        if (response.data && Array.isArray(response.data)) {
          this.orders = response.data.reduce((acc: OrderItemResponse[], order) => acc.concat(order.items), []);
          //this.dataSource.data = this.orders;
          this.dataSource.data = [...this.orders]; // Spread operator para evitar mutaciones
          this.calculateTotal();
        } else {
          console.error('La respuesta no tiene la estructura esperada:', response);
        }
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  addBeverageToOrder(beverage: any): void {
    const existingItemIndex = this.orders.findIndex(item => item.beverageId === beverage.id);

    if (existingItemIndex !== -1) {
      // Si la bebida ya existe, solo actualizamos la cantidad
      const updatedItem = { ...this.orders[existingItemIndex] };
      updatedItem.quantity += 1;
      updatedItem.subtotal = updatedItem.quantity * updatedItem.beveragePrice;

      // Actualizamos el item en el array
      this.orders = this.orders.map(item =>
        item.beverageId === beverage.id ? updatedItem : item
      );
    } else {
      // Si la bebida no existe, la agregamos como un nuevo item
      const newItem: OrderItemResponse = {
        id: Date.now(),
        orderId: 0,
        beverageId: beverage.id,
        beverageName: beverage.name,
        beveragePrice: beverage.price,
        quantity: 1,
        delivered: false,
        subtotal: beverage.price
      };
      //this.orders.push(newItem);
      this.orders = [...this.orders, newItem];
    }

    this.dataSource.data = [...this.orders];
    this.calculateTotal();
    this.syncOrdersWithBackend();
  }

  // Incrementar la cantidad de un item
  incrementQuantity(item: OrderItemResponse): void {
    const updatedItem = { ...item }; // Copia superficial
    updatedItem.quantity += 1;
    updatedItem.subtotal = updatedItem.quantity * updatedItem.beveragePrice;

    // Crear una nueva copia del array y actualizar solo el item correcto
    this.orders = this.orders.map(order =>
      order.id === item.id ? { ...updatedItem } : order
    );

    this.dataSource.data = [...this.orders]; // Nueva copia
    this.debounceSyncOrdersWithBackend();
  }

  // Decrementar la cantidad de un item
  decrementQuantity(item: OrderItemResponse): void {
    const updatedItem = { ...item };
    if (updatedItem.quantity > 1) {
      updatedItem.quantity -= 1;
      updatedItem.subtotal = updatedItem.quantity * updatedItem.beveragePrice;

      this.orders = this.orders.map(order =>
        order.id === item.id ? updatedItem : order
      );

      this.dataSource.data = [...this.orders];
      this.debounceSyncOrdersWithBackend();
    }
  }

  // Debouncing para evitar múltiples actualizaciones rápidas
  debounceSyncOrdersWithBackend(): void {
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(() => {
      this.syncOrdersWithBackend();
    }, 500); // Espera 500ms
  }

  // Cambiar el estado de entregado de una bebida
  toggleDelivered(item: OrderItemResponse): void {
    const delivered = !item.delivered;
    this.orderService.updateOrderItemStatus(item.orderId, item.id, delivered).subscribe(() => {
      this.getOrdersForTable();
    });
  }

  deleteOrder(item: OrderItemResponse): void {
    const index = this.orders.indexOf(item);
    if (index !== -1) {
      this.orderService.deleteOrderItem(item.orderId, item.id).subscribe(() => {
        this.orders.splice(index, 1);  // Solo se elimina después de la respuesta exitosa
        this.syncOrdersWithBackend();  // Asegura que se sincroniza correctamente
      }, error => {
        console.error('Error al eliminar el pedido:', error);
      });
    }
  }

  // Sincronizar las órdenes con el backend
  syncOrdersWithBackend(): void {
    const orderRequest: OrderRequest = {
      tableSpaceId: this.spaceId,
      tableId: this.mesaId,
      items: this.orders.map(orderItem => ({
        beverageId: orderItem.beverageId,
        quantity: orderItem.quantity
      }))
    };

    console.log('Enviando datos al backend:', orderRequest);
    this.orderService.createOrder(orderRequest).subscribe(
      (response: ApiResponse<OrderResponse>) => {
        console.log('Orden sincronizada con éxito:', response);
        this.getOrdersForTable();
      },
      (error) => {
        console.error('Error al sincronizar la orden', error);
      }
    );
  }

  calculateTotal(): void {
    this.total = this.orders.reduce((acc, item) => acc + item.subtotal, 0);
  }

  // Volver atrás a las mesas
  goBack(): void {
    this.router.navigate(['/view-tables', {
      id: this.spaceId,
      name: this.spaceName
    }]);
  }

  // Abrir modal para cobrar
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

  // Confirmar venta
  confirmarVenta(): void {
    this.orderService.closeOrder(this.mesaId).subscribe(response => {
      console.log('Venta confirmada y cerrada', response);
    });
  }
}
