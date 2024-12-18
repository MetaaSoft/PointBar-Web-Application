import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { RegisterComponent } from './core/auth/register/register.component';
import {LoginService} from "./core/services/auth/login/login.service";
import {RegisterService} from "./core/services/auth/register/register.service";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ConfigurationsComponent } from './bar/pages/configurations/configurations.component';
import { DashboardComponent } from './bar/pages/dashboard/dashboard.component';
import {MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {EmployeeService} from "./bar/services/employees/employee.service";
import {BusinessService} from "./bar/services/business/business.service";
import {MatGridList, MatGridListModule, MatGridTile} from "@angular/material/grid-list";
import {AuthInterceptor} from "./shared/services/authinterceptor";
import { EmployeesComponent } from './bar/pages/employees/employees.component';
import { EditEmployeesComponent } from './bar/pages/edit-employees/edit-employees.component';
import { TableManagementComponent } from './bar/pages/table-management/table-management.component';
import {TableService} from "./bar/services/tables/table.service";
import { BeverageComponent } from './bar/pages/beverage/beverage.component';
import {BeverageService} from "./bar/services/beverage/beverage.service";
import {CategoriesService} from "./bar/services/categories/categories.service";
import { BeveragedialogComponent } from './bar/pages/beverage/beveragedialog/beveragedialog.component';
import { CategorydialogComponent } from './bar/pages/beverage/categorydialog/categorydialog.component';
import { SalesComponent } from './bar/pages/sales/sales.component';
import { ViewTablesComponent } from './bar/pages/sales/view-tables/view-tables.component';
import { OrdenTableComponent } from './bar/pages/sales/orden-table/orden-table.component';
import {OrdersService} from "./bar/services/sales/orders.service";
import {MatChip} from "@angular/material/chips";
import { BeveragesTableComponent } from './bar/pages/sales/beverages-table/beverages-table.component';
import {BeverageselectedService} from "./bar/services/beverageselected/beverageselected.service";
import { CollectMoneyDialogComponent } from './bar/pages/sales/collect-money-dialog/collect-money-dialog.component';
import { SaleshistoryComponent } from './bar/pages/sales-history/saleshistory/saleshistory.component';
import {SalesHistoryService} from "./bar/services/sales-history/salesHistory.service";
import {DashboardService} from "./bar/services/dashboard/dashboard.service";
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    ConfigurationsComponent,
    DashboardComponent,
    EmployeesComponent,
    EditEmployeesComponent,
    TableManagementComponent,
    BeverageComponent,
    BeveragedialogComponent,
    CategorydialogComponent,
    SalesComponent,
    ViewTablesComponent,
    OrdenTableComponent,
    BeveragesTableComponent,
    CollectMoneyDialogComponent,
    SaleshistoryComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    CommonModule,
    MatTable,
    MatPaginator,
    MatGridTile,
    MatGridList,
    MatGridListModule,
    MatHeaderRow,
    MatRow,
    MatHeaderCell,
    MatCell,
    MatTableModule,
    MatPaginatorModule,
    MatChip,
    BaseChartDirective
  ],
  providers: [
    LoginService,
    RegisterService,
    EmployeeService,
    BusinessService,
    TableService,
    BeverageService,
    CategoriesService,
    OrdersService,
    BeverageselectedService,
    SalesHistoryService,
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
