import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {ConfigurationsComponent} from "./bar/pages/configurations/configurations.component";
import {DashboardComponent} from "./bar/pages/dashboard/dashboard.component";
import {TableManagementComponent} from "./bar/pages/table-management/table-management.component";
import {BeverageComponent} from "./bar/pages/beverage/beverage.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch:  "full"
  },
  {
    path: "login",
    title: "Log In",
    component: LoginComponent
  },
  {
    path: "register",
    title: "Register",
    component: RegisterComponent
  },
  {
    path: "dashboard",
    title: "Dashboard",
    component: DashboardComponent
  },
  {
    path: "beverage",
    title: "Beverage Management",
    component: BeverageComponent
  },
  {
    path: "tables",
    title: "Table Management",
    component: TableManagementComponent
  },
  {
    path: "configurations",
    title: "Configurations",
    component: ConfigurationsComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
