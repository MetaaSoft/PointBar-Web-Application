import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BusinessService} from "../../../bar/services/business/business.service";
import {Subscription} from "rxjs";
import {SidebarService} from "../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  logoUrl: string | null = null;
  businessName: string = '';
  private sidebarSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    this.loadBusinessData();
    this.sidebarSubscription = this.sidebarService.updateSidebar$.subscribe(() => {
      this.loadBusinessData();
    });
  }

  loadBusinessData(): void {
    this.businessService.getBusinessConfig().subscribe(response => {
      const data = response.data;
      this.logoUrl = data.logoUrl ? data.logoUrl : null;
      this.businessName = data.name || '';
    });
  }

  ngOnDestroy(): void {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
