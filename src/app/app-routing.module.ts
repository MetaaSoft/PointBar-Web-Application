import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {ConfigurationsComponent} from "./bar/pages/configurations/configurations.component";
import {DashboardComponent} from "./bar/pages/dashboard/dashboard.component";
import {TableManagementComponent} from "./bar/pages/table-management/table-management.component";

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
    path: "configurations",
    title: "Configurations",
    component: ConfigurationsComponent
  },
  {
    path: "tables",
    title: "Table Management",
    component: TableManagementComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
