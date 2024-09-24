import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private updateSidebarSource = new Subject<void>();
  updateSidebar$ = this.updateSidebarSource.asObservable();

  updateSidebar() {
    this.updateSidebarSource.next();
  }
}
